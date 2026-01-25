import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client or real client based on env vars
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('⚠️ Supabase credentials not found. Please create a .env file with:');
  console.warn('   VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.warn('   VITE_SUPABASE_ANON_KEY=your-anon-key');
  // Create a mock client that won't crash but will fail gracefully
  supabase = {
    from: () => ({
      insert: () => Promise.reject(new Error('Supabase not configured. Create .env file.')),
      select: () => Promise.reject(new Error('Supabase not configured. Create .env file.')),
    }),
  } as unknown as SupabaseClient;
}

export { supabase };

// Waitlist functions
export async function addToWaitlist(data: {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  send_to_country?: string;
  referral_source?: string;
}) {
  const { error } = await supabase
    .from('waitlist')
    .insert([data]);

  if (error) {
    // Handle duplicate email
    if (error.code === '23505') {
      throw new Error('This email is already on the waitlist!');
    }
    throw error;
  }

  return { success: true };
}

export async function checkWaitlistEmail(email: string) {
  const { data, error } = await supabase
    .from('waitlist')
    .select('id')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return !!data;
}

// CV Submissions for Careers page
export async function submitCV(data: {
  full_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  cover_letter?: string;
  cv_filename?: string;
}) {
  const { error } = await supabase
    .from('cv_submissions')
    .insert([{
      ...data,
      submitted_at: new Date().toISOString()
    }]);

  if (error) {
    if (error.code === '23505') {
      throw new Error('You have already submitted your CV with this email!');
    }
    throw error;
  }

  return { success: true };
}

// Contact/Enquiry submissions
export async function submitEnquiry(data: {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase
    .from('enquiries')
    .insert([{
      ...data,
      submitted_at: new Date().toISOString()
    }]);

  if (error) {
    throw error;
  }

  return { success: true };
}
