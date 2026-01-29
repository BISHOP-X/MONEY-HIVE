-- ============================================================================
-- Migration: Create Profiles Table
-- Created: 2026-01-29
-- Purpose: User profiles extending Supabase auth.users with KYC and limits
-- ============================================================================

-- ============================================================================
-- STEP 1: Create ENUM types for structured data
-- ============================================================================

-- KYC verification status
CREATE TYPE kyc_status AS ENUM (
  'unverified',    -- User has not started KYC
  'pending',       -- KYC documents submitted, awaiting review
  'approved',      -- KYC approved, full access
  'rejected',      -- KYC rejected, needs resubmission
  'expired'        -- KYC approval expired, needs renewal
);

-- KYC verification tier (limits based on tier)
CREATE TYPE kyc_tier AS ENUM (
  'tier_0',        -- Unverified: £0/€0/$0 daily limit (no transfers)
  'tier_1',        -- Basic: £500/€600/$650 daily limit (ID only)
  'tier_2',        -- Standard: £2,500/€3,000/$3,250 daily limit (ID + Address)
  'tier_3'         -- Premium: £10,000/€12,000/$13,000 daily limit (Full KYC)
);

-- ============================================================================
-- STEP 2: Create profiles table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  -- Primary key (references auth.users)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic user info
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  
  -- KYC information
  kyc_status kyc_status DEFAULT 'unverified' NOT NULL,
  kyc_tier kyc_tier DEFAULT 'tier_0' NOT NULL,
  kyc_submitted_at TIMESTAMPTZ,
  kyc_approved_at TIMESTAMPTZ,
  kyc_rejected_reason TEXT,
  
  -- Financial limits (in GBP, convert for other currencies)
  daily_limit_gbp DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  daily_spent_gbp DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
  last_reset_date DATE DEFAULT CURRENT_DATE NOT NULL,
  
  -- Referral system
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  referral_count INTEGER DEFAULT 0 NOT NULL,
  
  -- User preferences
  preferred_currency TEXT DEFAULT 'GBP',
  notification_email BOOLEAN DEFAULT true,
  notification_sms BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$'),
  CONSTRAINT valid_currency CHECK (preferred_currency IN ('GBP', 'USD', 'EUR')),
  CONSTRAINT valid_limits CHECK (daily_limit_gbp >= 0 AND daily_spent_gbp >= 0),
  CONSTRAINT valid_spent CHECK (daily_spent_gbp <= daily_limit_gbp)
);

-- ============================================================================
-- STEP 3: Create indexes for performance
-- ============================================================================

-- Index for quick lookups by referral code
CREATE INDEX idx_profiles_referral_code ON public.profiles(referral_code) 
WHERE referral_code IS NOT NULL;

-- Index for referral relationships
CREATE INDEX idx_profiles_referred_by ON public.profiles(referred_by) 
WHERE referred_by IS NOT NULL;

-- Index for KYC status filtering
CREATE INDEX idx_profiles_kyc_status ON public.profiles(kyc_status);

-- Index for email lookups (unique constraint already creates index)
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- ============================================================================
-- STEP 4: Create trigger function for automatic profile creation
-- ============================================================================

-- Function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  ref_code TEXT;
BEGIN
  -- Generate unique 8-character referral code (e.g., MH7X9K2L)
  ref_code := 'MH' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  
  -- Ensure uniqueness (retry if collision)
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = ref_code) LOOP
    ref_code := 'MH' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  END LOOP;
  
  -- Create profile with default unverified tier
  INSERT INTO public.profiles (
    id,
    email,
    referral_code,
    kyc_status,
    kyc_tier,
    daily_limit_gbp,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    ref_code,
    'unverified',
    'tier_0',
    0.00,
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 5: Create trigger function for updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger for profiles table
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- STEP 6: Create function to reset daily spending limits
-- ============================================================================

CREATE OR REPLACE FUNCTION public.reset_daily_limits()
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Reset daily_spent_gbp for all users if last_reset_date is before today
  UPDATE public.profiles
  SET 
    daily_spent_gbp = 0.00,
    last_reset_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE last_reset_date < CURRENT_DATE;
END;
$$;

-- Note: In production, this should be called by a daily cron job
-- For local development, it will be called when user attempts a transfer

-- ============================================================================
-- STEP 7: Create function to update KYC tier and limits
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_kyc_tier(
  user_id UUID,
  new_tier kyc_tier
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_limit DECIMAL(10, 2);
BEGIN
  -- Set daily limit based on tier
  new_limit := CASE new_tier
    WHEN 'tier_0' THEN 0.00
    WHEN 'tier_1' THEN 500.00
    WHEN 'tier_2' THEN 2500.00
    WHEN 'tier_3' THEN 10000.00
    ELSE 0.00
  END;
  
  -- Update user's tier and limit
  UPDATE public.profiles
  SET 
    kyc_tier = new_tier,
    daily_limit_gbp = new_limit,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$;

-- ============================================================================
-- STEP 8: Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile (except sensitive fields)
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Prevent users from modifying protected fields
    AND kyc_status = (SELECT kyc_status FROM public.profiles WHERE id = auth.uid())
    AND kyc_tier = (SELECT kyc_tier FROM public.profiles WHERE id = auth.uid())
    AND daily_limit_gbp = (SELECT daily_limit_gbp FROM public.profiles WHERE id = auth.uid())
    AND referral_code = (SELECT referral_code FROM public.profiles WHERE id = auth.uid())
  );

-- Policy: Service role can do everything (for backend operations)
CREATE POLICY "Service role has full access"
  ON public.profiles
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role')
  WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- STEP 9: Grant necessary permissions
-- ============================================================================

-- Grant permissions to authenticated users
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Grant usage on sequences (if any are added later)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- STEP 10: Create helper view for profile with calculated fields
-- ============================================================================

CREATE OR REPLACE VIEW public.profile_with_limits AS
SELECT 
  p.*,
  p.daily_limit_gbp - p.daily_spent_gbp AS remaining_limit_gbp,
  CASE 
    WHEN p.last_reset_date < CURRENT_DATE THEN p.daily_limit_gbp
    ELSE p.daily_limit_gbp - p.daily_spent_gbp
  END AS available_limit_gbp,
  CASE 
    WHEN p.kyc_status = 'approved' THEN true
    ELSE false
  END AS can_transfer,
  (SELECT COUNT(*) FROM public.profiles WHERE referred_by = p.id) AS actual_referral_count
FROM public.profiles p;

-- Grant access to view
GRANT SELECT ON public.profile_with_limits TO authenticated;

-- ============================================================================
-- STEP 11: Insert sample data for testing (optional - remove in production)
-- ============================================================================

-- Note: This will only work if you manually insert auth.users first
-- Uncomment below for local testing:

/*
-- Sample profile 1 (unverified user)
INSERT INTO public.profiles (
  id, 
  email, 
  first_name, 
  last_name, 
  kyc_status, 
  kyc_tier, 
  daily_limit_gbp
) VALUES (
  'sample-uuid-1',
  'test@moneyhive.com',
  'John',
  'Doe',
  'unverified',
  'tier_0',
  0.00
);

-- Sample profile 2 (verified user)
INSERT INTO public.profiles (
  id, 
  email, 
  first_name, 
  last_name, 
  kyc_status, 
  kyc_tier, 
  daily_limit_gbp,
  kyc_approved_at
) VALUES (
  'sample-uuid-2',
  'verified@moneyhive.com',
  'Jane',
  'Smith',
  'approved',
  'tier_2',
  2500.00,
  NOW()
);
*/

-- ============================================================================
-- VERIFICATION QUERIES (run these to confirm everything works)
-- ============================================================================

-- Check table structure
-- SELECT * FROM information_schema.columns WHERE table_name = 'profiles';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check triggers
-- SELECT * FROM information_schema.triggers WHERE event_object_table = 'profiles';

-- Test the view
-- SELECT * FROM public.profile_with_limits LIMIT 5;

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================

-- To rollback this migration, run:
/*
DROP VIEW IF EXISTS public.profile_with_limits;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.reset_daily_limits() CASCADE;
DROP FUNCTION IF EXISTS public.update_kyc_tier(UUID, kyc_tier) CASCADE;
DROP TYPE IF EXISTS kyc_status CASCADE;
DROP TYPE IF EXISTS kyc_tier CASCADE;
*/

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
