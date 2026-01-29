-- ============================================================================
-- Migration: Create Recipients Table
-- Created: 2026-01-29
-- Purpose: Store saved transfer recipients (bank accounts & mobile money)
-- ============================================================================

-- ============================================================================
-- STEP 1: Create ENUM types for recipient data
-- ============================================================================

-- Country codes for recipients
CREATE TYPE recipient_country AS ENUM (
  'NG',  -- Nigeria
  'GH',  -- Ghana
  'KE'   -- Kenya
);

-- Delivery method for transfers
CREATE TYPE delivery_method AS ENUM (
  'bank_transfer',   -- Bank account (primarily Nigeria)
  'mobile_money',    -- Mobile money (Ghana, Kenya)
  'cash_pickup'      -- Cash pickup locations (future)
);

-- ============================================================================
-- STEP 2: Create recipients table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.recipients (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Owner reference
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Recipient basic info
  name TEXT NOT NULL,
  country recipient_country NOT NULL,
  delivery_method delivery_method NOT NULL,
  
  -- Bank transfer details (Nigeria primarily)
  bank_name TEXT,
  bank_code TEXT,
  account_number TEXT,
  account_name TEXT,  -- Verified name from bank
  
  -- Mobile money details (Ghana, Kenya)
  mobile_provider TEXT,  -- e.g., 'MTN', 'Vodafone', 'Airtel', 'M-Pesa'
  mobile_number TEXT,
  mobile_account_name TEXT,  -- Registered name on mobile money
  
  -- Cash pickup details (future)
  pickup_location TEXT,
  pickup_id_type TEXT,
  
  -- Metadata
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  nickname TEXT,  -- User's custom name for recipient
  relationship TEXT,  -- e.g., 'Family', 'Friend', 'Business'
  notes TEXT,  -- Private notes about recipient
  
  -- Verification status
  is_verified BOOLEAN DEFAULT false NOT NULL,
  verification_date TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  
  -- Transaction tracking
  transfer_count INTEGER DEFAULT 0 NOT NULL,
  total_amount_sent DECIMAL(12, 2) DEFAULT 0.00 NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_name CHECK (LENGTH(TRIM(name)) >= 2),
  CONSTRAINT valid_bank_account CHECK (
    delivery_method != 'bank_transfer' 
    OR (bank_name IS NOT NULL AND account_number IS NOT NULL)
  ),
  CONSTRAINT valid_mobile_money CHECK (
    delivery_method != 'mobile_money' 
    OR (mobile_provider IS NOT NULL AND mobile_number IS NOT NULL)
  ),
  CONSTRAINT valid_account_number CHECK (
    account_number IS NULL 
    OR (account_number ~ '^[0-9]{10}$')  -- Nigerian banks are 10 digits
  ),
  CONSTRAINT valid_mobile_number CHECK (
    mobile_number IS NULL 
    OR (mobile_number ~ '^\+?[1-9]\d{9,14}$')  -- International format
  ),
  CONSTRAINT valid_transfer_count CHECK (transfer_count >= 0),
  CONSTRAINT valid_total_amount CHECK (total_amount_sent >= 0)
);

-- ============================================================================
-- STEP 3: Create indexes for performance
-- ============================================================================

-- Index for quick user lookup (most common query)
CREATE INDEX idx_recipients_user_id ON public.recipients(user_id);

-- Index for favorites (show favorites first)
CREATE INDEX idx_recipients_favorites ON public.recipients(user_id, is_favorite) 
WHERE is_favorite = true;

-- Index for country filtering
CREATE INDEX idx_recipients_country ON public.recipients(user_id, country);

-- Index for delivery method filtering
CREATE INDEX idx_recipients_delivery_method ON public.recipients(user_id, delivery_method);

-- Index for recently used recipients
CREATE INDEX idx_recipients_last_used ON public.recipients(user_id, last_used_at DESC NULLS LAST);

-- Index for search by name
CREATE INDEX idx_recipients_name_search ON public.recipients 
USING gin(to_tsvector('english', name));

-- Composite index for common filters (user + country + delivery)
CREATE INDEX idx_recipients_user_country_delivery 
ON public.recipients(user_id, country, delivery_method);

-- ============================================================================
-- STEP 4: Create trigger for updated_at timestamp
-- ============================================================================

-- Reuse the handle_updated_at function from profiles migration
DROP TRIGGER IF EXISTS on_recipients_updated ON public.recipients;
CREATE TRIGGER on_recipients_updated
  BEFORE UPDATE ON public.recipients
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- STEP 5: Create helper functions
-- ============================================================================

-- Function to increment transfer count when a transfer is made
CREATE OR REPLACE FUNCTION public.update_recipient_usage(
  recipient_id UUID,
  amount_sent DECIMAL(12, 2)
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.recipients
  SET 
    transfer_count = transfer_count + 1,
    total_amount_sent = total_amount_sent + amount_sent,
    last_used_at = NOW(),
    updated_at = NOW()
  WHERE id = recipient_id;
END;
$$;

-- Function to toggle favorite status
CREATE OR REPLACE FUNCTION public.toggle_recipient_favorite(
  recipient_id UUID
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_status BOOLEAN;
BEGIN
  UPDATE public.recipients
  SET 
    is_favorite = NOT is_favorite,
    updated_at = NOW()
  WHERE id = recipient_id AND user_id = auth.uid()
  RETURNING is_favorite INTO new_status;
  
  RETURN new_status;
END;
$$;

-- Function to verify recipient account details
CREATE OR REPLACE FUNCTION public.verify_recipient(
  recipient_id UUID,
  verified_name TEXT
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.recipients
  SET 
    is_verified = true,
    verification_date = NOW(),
    account_name = COALESCE(verified_name, account_name),
    updated_at = NOW()
  WHERE id = recipient_id AND user_id = auth.uid();
END;
$$;

-- Function to get user's frequently used recipients
CREATE OR REPLACE FUNCTION public.get_frequent_recipients(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  country recipient_country,
  delivery_method delivery_method,
  transfer_count INTEGER,
  last_used_at TIMESTAMPTZ
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.country,
    r.delivery_method,
    r.transfer_count,
    r.last_used_at
  FROM public.recipients r
  WHERE r.user_id = p_user_id
    AND r.transfer_count > 0
  ORDER BY r.transfer_count DESC, r.last_used_at DESC NULLS LAST
  LIMIT p_limit;
END;
$$;

-- ============================================================================
-- STEP 6: Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on recipients table
ALTER TABLE public.recipients ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own recipients
CREATE POLICY "Users can view own recipients"
  ON public.recipients
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own recipients
CREATE POLICY "Users can insert own recipients"
  ON public.recipients
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own recipients
CREATE POLICY "Users can update own recipients"
  ON public.recipients
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own recipients
CREATE POLICY "Users can delete own recipients"
  ON public.recipients
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Service role has full access (for backend operations)
CREATE POLICY "Service role has full access to recipients"
  ON public.recipients
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- STEP 7: Grant necessary permissions
-- ============================================================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recipients TO authenticated;
GRANT ALL ON public.recipients TO service_role;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- STEP 8: Create helper view for recipients with details
-- ============================================================================

CREATE OR REPLACE VIEW public.recipients_with_details AS
SELECT 
  r.*,
  CASE 
    WHEN r.delivery_method = 'bank_transfer' THEN r.bank_name || ' - ' || r.account_number
    WHEN r.delivery_method = 'mobile_money' THEN r.mobile_provider || ' - ' || r.mobile_number
    ELSE 'Cash Pickup'
  END AS display_details,
  CASE 
    WHEN r.transfer_count > 10 THEN 'frequent'
    WHEN r.transfer_count > 0 THEN 'used'
    ELSE 'new'
  END AS usage_level,
  CASE 
    WHEN r.last_used_at IS NULL THEN 'Never used'
    WHEN r.last_used_at > NOW() - INTERVAL '7 days' THEN 'Recent'
    WHEN r.last_used_at > NOW() - INTERVAL '30 days' THEN 'This month'
    WHEN r.last_used_at > NOW() - INTERVAL '90 days' THEN 'Last 3 months'
    ELSE 'Inactive'
  END AS recency_status
FROM public.recipients r;

-- Grant access to view
GRANT SELECT ON public.recipients_with_details TO authenticated;

-- ============================================================================
-- STEP 9: Create validation function for bank account
-- ============================================================================

-- Mock bank validation (replace with real API call to Flutterwave)
CREATE OR REPLACE FUNCTION public.validate_bank_account(
  p_bank_code TEXT,
  p_account_number TEXT
)
RETURNS TABLE (
  is_valid BOOLEAN,
  account_name TEXT,
  error_message TEXT
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- This is a mock validation
  -- In production, call Flutterwave's Account Verification API
  -- Endpoint: POST https://api.flutterwave.com/v3/accounts/resolve
  
  -- For now, return mock success
  RETURN QUERY SELECT 
    true AS is_valid,
    'MOCK ACCOUNT NAME' AS account_name,
    NULL::TEXT AS error_message;
  
  -- Real implementation would be:
  -- 1. Call Flutterwave API with bank_code and account_number
  -- 2. Parse response
  -- 3. Return actual validation result
END;
$$;

-- ============================================================================
-- STEP 10: Insert sample data for testing (optional)
-- ============================================================================

-- Note: Uncomment for local testing (requires valid user_id from auth.users)

/*
-- Sample recipient 1 (Nigerian bank account)
INSERT INTO public.recipients (
  user_id,
  name,
  country,
  delivery_method,
  bank_name,
  bank_code,
  account_number,
  account_name,
  is_verified,
  is_favorite
) VALUES (
  'your-user-uuid',
  'John Adekunle',
  'NG',
  'bank_transfer',
  'Access Bank',
  '044',
  '0123456789',
  'JOHN ADEKUNLE ADEOLA',
  true,
  true
);

-- Sample recipient 2 (Ghanaian mobile money)
INSERT INTO public.recipients (
  user_id,
  name,
  country,
  delivery_method,
  mobile_provider,
  mobile_number,
  mobile_account_name,
  is_verified
) VALUES (
  'your-user-uuid',
  'Kwame Mensah',
  'GH',
  'mobile_money',
  'MTN',
  '+233244567890',
  'KWAME MENSAH',
  true
);

-- Sample recipient 3 (Kenyan M-Pesa)
INSERT INTO public.recipients (
  user_id,
  name,
  country,
  delivery_method,
  mobile_provider,
  mobile_number,
  mobile_account_name,
  is_verified
) VALUES (
  'your-user-uuid',
  'Grace Wanjiru',
  'KE',
  'mobile_money',
  'M-Pesa',
  '+254712345678',
  'GRACE WANJIRU KAMAU',
  true
);
*/

-- ============================================================================
-- VERIFICATION QUERIES (run these to confirm everything works)
-- ============================================================================

-- Check table structure
-- SELECT * FROM information_schema.columns WHERE table_name = 'recipients';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'recipients';

-- Check triggers
-- SELECT * FROM information_schema.triggers WHERE event_object_table = 'recipients';

-- Test the view
-- SELECT * FROM public.recipients_with_details LIMIT 5;

-- Test helper functions
-- SELECT * FROM public.get_frequent_recipients('your-user-uuid', 5);

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================

-- To rollback this migration, run:
/*
DROP VIEW IF EXISTS public.recipients_with_details;
DROP FUNCTION IF EXISTS public.validate_bank_account(TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.get_frequent_recipients(UUID, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.verify_recipient(UUID, TEXT) CASCADE;
DROP FUNCTION IF EXISTS public.toggle_recipient_favorite(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.update_recipient_usage(UUID, DECIMAL) CASCADE;
DROP TABLE IF EXISTS public.recipients CASCADE;
DROP TYPE IF EXISTS delivery_method CASCADE;
DROP TYPE IF EXISTS recipient_country CASCADE;
*/

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
