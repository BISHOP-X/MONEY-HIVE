-- ============================================================================
-- Migration: Create Transactions Table
-- Created: 2026-01-29
-- Purpose: Store all money transfers and bill payments with full audit trail
-- ============================================================================

-- ============================================================================
-- STEP 1: Create ENUM types for transaction data
-- ============================================================================

-- Transaction type
CREATE TYPE transaction_type AS ENUM (
  'transfer',        -- Money transfer to recipient
  'bill_payment',    -- Bill payment (airtime, electricity, etc.)
  'refund',          -- Refund of failed transaction
  'reversal'         -- Administrative reversal
);

-- Transaction status (full lifecycle)
CREATE TYPE transaction_status AS ENUM (
  'initiated',       -- User submitted, not yet paid
  'pending_payment', -- Awaiting payment from user
  'payment_received',-- Payment received, processing
  'processing',      -- Being processed by provider
  'completed',       -- Successfully completed
  'failed',          -- Failed (payment/processing)
  'cancelled',       -- Cancelled by user
  'refunded',        -- Refunded to user
  'reversed'         -- Administratively reversed
);

-- Payment method (how user pays)
CREATE TYPE payment_method AS ENUM (
  'bank_transfer',   -- UK/US bank transfer via Nium
  'card',            -- Debit/Credit card via Nium
  'ach',             -- US ACH transfer via Nium
  'open_banking',    -- UK Open Banking via Nium
  'wallet'           -- MoneyHive wallet balance (future)
);

-- Bill payment category
CREATE TYPE bill_category AS ENUM (
  'airtime',         -- Mobile airtime top-up
  'data',            -- Mobile data bundles
  'electricity',     -- Electricity bills
  'tv',              -- Cable TV subscriptions
  'internet',        -- Internet bills
  'water',           -- Water bills
  'waste',           -- Waste management
  'insurance',       -- Insurance premiums
  'education'        -- School fees
);

-- ============================================================================
-- STEP 2: Create transactions table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.transactions (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User reference
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Transaction classification
  type transaction_type NOT NULL,
  status transaction_status DEFAULT 'initiated' NOT NULL,
  
  -- Amount details (source)
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  fee DECIMAL(8, 2) DEFAULT 0.00 NOT NULL,
  total_charged DECIMAL(12, 2) NOT NULL, -- amount + fee
  
  -- Destination details (for transfers)
  destination_currency TEXT,
  destination_amount DECIMAL(12, 2),
  exchange_rate DECIMAL(12, 6),
  
  -- Recipient reference (for transfers)
  recipient_id UUID REFERENCES public.recipients(id) ON DELETE SET NULL,
  recipient_name TEXT, -- Cached for display if recipient deleted
  recipient_account TEXT, -- Masked account number
  
  -- Bill payment details (for bill payments)
  bill_category bill_category,
  bill_provider TEXT,
  bill_account_number TEXT,
  bill_customer_name TEXT,
  
  -- Payment details
  payment_method payment_method NOT NULL,
  payment_reference TEXT, -- Nium payment reference
  payment_received_at TIMESTAMPTZ,
  
  -- Provider details (Flutterwave for disbursement)
  provider_name TEXT DEFAULT 'Flutterwave',
  provider_reference TEXT, -- Flutterwave transaction ID
  provider_status TEXT,
  provider_response JSONB, -- Full provider response
  
  -- MoneyHive references
  reference TEXT UNIQUE NOT NULL, -- Our transaction reference (e.g., MH123ABC)
  short_code TEXT, -- User-friendly code (e.g., 123456)
  
  -- Metadata
  description TEXT,
  notes TEXT, -- User's private notes
  failure_reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  
  -- Audit trail
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Constraints
  CONSTRAINT valid_amount CHECK (amount > 0),
  CONSTRAINT valid_fee CHECK (fee >= 0),
  CONSTRAINT valid_total CHECK (total_charged = amount + fee),
  CONSTRAINT valid_currency CHECK (currency IN ('GBP', 'USD', 'EUR')),
  CONSTRAINT valid_destination_currency CHECK (
    destination_currency IS NULL 
    OR destination_currency IN ('NGN', 'GHS', 'KES')
  ),
  CONSTRAINT valid_transfer_details CHECK (
    type != 'transfer' 
    OR (destination_currency IS NOT NULL AND destination_amount IS NOT NULL)
  ),
  CONSTRAINT valid_bill_details CHECK (
    type != 'bill_payment' 
    OR (bill_category IS NOT NULL AND bill_provider IS NOT NULL)
  ),
  CONSTRAINT valid_exchange_rate CHECK (
    exchange_rate IS NULL 
    OR (exchange_rate > 0 AND exchange_rate < 10000)
  ),
  CONSTRAINT valid_reference CHECK (reference ~ '^MH[A-Z0-9]{6,12}$'),
  CONSTRAINT valid_short_code CHECK (
    short_code IS NULL 
    OR short_code ~ '^[0-9]{6}$'
  )
);

-- ============================================================================
-- STEP 3: Create indexes for performance
-- ============================================================================

-- Index for user's transaction list (most common query)
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id, created_at DESC);

-- Index for status filtering
CREATE INDEX idx_transactions_status ON public.transactions(user_id, status, created_at DESC);

-- Index for type filtering
CREATE INDEX idx_transactions_type ON public.transactions(user_id, type, created_at DESC);

-- Index for reference lookup (unique already creates index)
CREATE INDEX idx_transactions_reference ON public.transactions(reference);

-- Index for short code lookup
CREATE INDEX idx_transactions_short_code ON public.transactions(short_code) 
WHERE short_code IS NOT NULL;

-- Index for recipient's transaction history
CREATE INDEX idx_transactions_recipient ON public.transactions(recipient_id, created_at DESC)
WHERE recipient_id IS NOT NULL;

-- Index for date range queries
CREATE INDEX idx_transactions_date_range ON public.transactions(user_id, created_at DESC, completed_at DESC);

-- Index for provider reference lookup
CREATE INDEX idx_transactions_provider_ref ON public.transactions(provider_reference)
WHERE provider_reference IS NOT NULL;

-- Composite index for dashboard queries (recent completed)
CREATE INDEX idx_transactions_dashboard 
ON public.transactions(user_id, status, created_at DESC)
WHERE status IN ('completed', 'processing');

-- ============================================================================
-- STEP 4: Create trigger for updated_at timestamp
-- ============================================================================

DROP TRIGGER IF EXISTS on_transactions_updated ON public.transactions;
CREATE TRIGGER on_transactions_updated
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- STEP 5: Create helper functions
-- ============================================================================

-- Function to generate unique transaction reference
CREATE OR REPLACE FUNCTION public.generate_transaction_reference()
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  ref TEXT;
BEGIN
  -- Generate format: MH + 8 alphanumeric characters (e.g., MHAB12CD34)
  ref := 'MH' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 8));
  
  -- Ensure uniqueness (retry if collision - very unlikely)
  WHILE EXISTS (SELECT 1 FROM public.transactions WHERE reference = ref) LOOP
    ref := 'MH' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT) FROM 1 FOR 8));
  END LOOP;
  
  RETURN ref;
END;
$$;

-- Function to generate 6-digit short code
CREATE OR REPLACE FUNCTION public.generate_short_code()
RETURNS TEXT
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
BEGIN
  -- Generate 6-digit code (100000-999999)
  code := LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0');
  
  -- Ensure uniqueness (retry if collision)
  WHILE EXISTS (SELECT 1 FROM public.transactions WHERE short_code = code) LOOP
    code := LPAD(FLOOR(RANDOM() * 900000 + 100000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN code;
END;
$$;

-- Function to auto-generate references before insert
CREATE OR REPLACE FUNCTION public.auto_generate_transaction_refs()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Generate reference if not provided
  IF NEW.reference IS NULL THEN
    NEW.reference := public.generate_transaction_reference();
  END IF;
  
  -- Generate short code if not provided
  IF NEW.short_code IS NULL THEN
    NEW.short_code := public.generate_short_code();
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_transaction_insert ON public.transactions;
CREATE TRIGGER on_transaction_insert
  BEFORE INSERT ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_transaction_refs();

-- Function to update transaction status
CREATE OR REPLACE FUNCTION public.update_transaction_status(
  transaction_id UUID,
  new_status transaction_status,
  provider_ref TEXT DEFAULT NULL,
  provider_resp JSONB DEFAULT NULL
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.transactions
  SET 
    status = new_status,
    provider_reference = COALESCE(provider_ref, provider_reference),
    provider_response = COALESCE(provider_resp, provider_response),
    completed_at = CASE WHEN new_status = 'completed' THEN NOW() ELSE completed_at END,
    failed_at = CASE WHEN new_status IN ('failed', 'cancelled') THEN NOW() ELSE failed_at END,
    updated_at = NOW()
  WHERE id = transaction_id;
  
  -- If completed, update recipient usage
  IF new_status = 'completed' AND EXISTS (
    SELECT 1 FROM public.transactions 
    WHERE id = transaction_id AND recipient_id IS NOT NULL
  ) THEN
    DECLARE
      recip_id UUID;
      txn_amount DECIMAL(12, 2);
    BEGIN
      SELECT recipient_id, destination_amount 
      INTO recip_id, txn_amount
      FROM public.transactions 
      WHERE id = transaction_id;
      
      IF recip_id IS NOT NULL THEN
        PERFORM public.update_recipient_usage(recip_id, txn_amount);
      END IF;
    END;
  END IF;
END;
$$;

-- Function to get user's transaction summary
CREATE OR REPLACE FUNCTION public.get_transaction_summary(
  p_user_id UUID,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
  total_transactions BIGINT,
  total_sent DECIMAL(12, 2),
  total_fees DECIMAL(12, 2),
  completed_count BIGINT,
  pending_count BIGINT,
  failed_count BIGINT,
  favorite_recipient_id UUID,
  favorite_recipient_name TEXT
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) AS total_transactions,
    COALESCE(SUM(amount), 0) AS total_sent,
    COALESCE(SUM(fee), 0) AS total_fees,
    COUNT(*) FILTER (WHERE status = 'completed') AS completed_count,
    COUNT(*) FILTER (WHERE status IN ('initiated', 'pending_payment', 'processing')) AS pending_count,
    COUNT(*) FILTER (WHERE status IN ('failed', 'cancelled')) AS failed_count,
    (SELECT recipient_id FROM public.transactions 
     WHERE user_id = p_user_id 
       AND recipient_id IS NOT NULL 
       AND status = 'completed'
       AND created_at > NOW() - INTERVAL '1 day' * p_days
     GROUP BY recipient_id 
     ORDER BY COUNT(*) DESC 
     LIMIT 1) AS favorite_recipient_id,
    (SELECT recipient_name FROM public.transactions 
     WHERE user_id = p_user_id 
       AND recipient_id IS NOT NULL 
       AND status = 'completed'
       AND created_at > NOW() - INTERVAL '1 day' * p_days
     GROUP BY recipient_id, recipient_name
     ORDER BY COUNT(*) DESC 
     LIMIT 1) AS favorite_recipient_name
  FROM public.transactions
  WHERE user_id = p_user_id
    AND created_at > NOW() - INTERVAL '1 day' * p_days;
END;
$$;

-- ============================================================================
-- STEP 6: Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on transactions table
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON public.transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own transactions
CREATE POLICY "Users can insert own transactions"
  ON public.transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own transactions (limited fields)
-- Only allow updating notes, not core transaction data
CREATE POLICY "Users can update own transaction notes"
  ON public.transactions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    -- Prevent modification of critical fields
    AND status = (SELECT status FROM public.transactions WHERE id = transactions.id)
    AND amount = (SELECT amount FROM public.transactions WHERE id = transactions.id)
    AND reference = (SELECT reference FROM public.transactions WHERE id = transactions.id)
  );

-- Policy: Service role has full access (for backend/webhook updates)
CREATE POLICY "Service role has full access to transactions"
  ON public.transactions
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- STEP 7: Grant necessary permissions
-- ============================================================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- STEP 8: Create helper views
-- ============================================================================

-- View for user-friendly transaction display
CREATE OR REPLACE VIEW public.transactions_display AS
SELECT 
  t.id,
  t.user_id,
  t.type,
  t.status,
  t.amount,
  t.currency,
  t.fee,
  t.total_charged,
  t.destination_amount,
  t.destination_currency,
  t.reference,
  t.short_code,
  CASE 
    WHEN t.type = 'transfer' THEN t.recipient_name
    WHEN t.type = 'bill_payment' THEN t.bill_provider || ' - ' || t.bill_category::TEXT
    ELSE t.description
  END AS display_title,
  CASE 
    WHEN t.type = 'transfer' THEN t.recipient_account
    WHEN t.type = 'bill_payment' THEN t.bill_account_number
    ELSE NULL
  END AS display_account,
  CASE 
    WHEN t.status IN ('completed') THEN 'success'
    WHEN t.status IN ('failed', 'cancelled', 'reversed') THEN 'error'
    WHEN t.status IN ('processing', 'pending_payment', 'payment_received') THEN 'pending'
    ELSE 'default'
  END AS status_variant,
  t.created_at,
  t.completed_at,
  COALESCE(t.completed_at, t.created_at) AS sort_date
FROM public.transactions t;

-- Grant access to view
GRANT SELECT ON public.transactions_display TO authenticated;

-- ============================================================================
-- STEP 9: Create function to calculate daily spending
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_daily_spending(p_user_id UUID)
RETURNS DECIMAL(12, 2)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(total_charged)
     FROM public.transactions
     WHERE user_id = p_user_id
       AND status IN ('completed', 'processing', 'pending_payment')
       AND created_at::DATE = CURRENT_DATE),
    0.00
  );
END;
$$;

-- ============================================================================
-- STEP 10: Insert sample data for testing (optional)
-- ============================================================================

-- Note: Uncomment for local testing (requires valid user_id)

/*
-- Sample transaction 1 (completed transfer)
INSERT INTO public.transactions (
  user_id,
  type,
  status,
  amount,
  currency,
  fee,
  total_charged,
  destination_amount,
  destination_currency,
  exchange_rate,
  recipient_name,
  payment_method,
  completed_at
) VALUES (
  'your-user-uuid',
  'transfer',
  'completed',
  100.00,
  'GBP',
  2.99,
  102.99,
  195000.00,
  'NGN',
  1950.00,
  'John Adekunle',
  'bank_transfer',
  NOW() - INTERVAL '1 hour'
);

-- Sample transaction 2 (pending bill payment)
INSERT INTO public.transactions (
  user_id,
  type,
  status,
  amount,
  currency,
  fee,
  total_charged,
  bill_category,
  bill_provider,
  bill_account_number,
  payment_method
) VALUES (
  'your-user-uuid',
  'bill_payment',
  'processing',
  50.00,
  'GBP',
  1.99,
  51.99,
  'electricity',
  'PHCN Prepaid',
  '1234567890',
  'card'
);
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check table structure
-- SELECT * FROM information_schema.columns WHERE table_name = 'transactions';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'transactions';

-- Check triggers
-- SELECT * FROM information_schema.triggers WHERE event_object_table = 'transactions';

-- Test reference generation
-- SELECT public.generate_transaction_reference();
-- SELECT public.generate_short_code();

-- Test views
-- SELECT * FROM public.transactions_display LIMIT 5;

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================

-- To rollback this migration, run:
/*
DROP VIEW IF EXISTS public.transactions_display;
DROP FUNCTION IF EXISTS public.get_daily_spending(UUID) CASCADE;
DROP FUNCTION IF EXISTS public.get_transaction_summary(UUID, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.update_transaction_status(UUID, transaction_status, TEXT, JSONB) CASCADE;
DROP FUNCTION IF EXISTS public.auto_generate_transaction_refs() CASCADE;
DROP FUNCTION IF EXISTS public.generate_short_code() CASCADE;
DROP FUNCTION IF EXISTS public.generate_transaction_reference() CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TYPE IF EXISTS bill_category CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS transaction_status CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;
*/

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
