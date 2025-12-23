import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Waitlist functions
export async function addToWaitlist(data: {
  email: string;
  full_name?: string;
  country?: string;
  referral_source?: string;
}) {
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([data])
    .select()
    .single();

  if (error) {
    // Handle duplicate email
    if (error.code === '23505') {
      throw new Error('This email is already on the waitlist!');
    }
    throw error;
  }

  return result;
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
