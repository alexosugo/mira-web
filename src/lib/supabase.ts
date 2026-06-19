import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazily construct the client so a missing/misconfigured backend degrades to a
// recoverable form error instead of throwing at import time and white-screening
// the page (the Pricing modal pulls this into the always-rendered tree).
let client: SupabaseClient | null = null;

/**
 * Returns the Supabase client, or null when env vars are absent. Callers must
 * handle null (e.g. show the user a "try again / email us" fallback).
 */
export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables; form submission is disabled.');
    return null;
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

/** A lead from the Elite "Get in touch" form. Maps to the elite_inquiries table. */
export interface EliteInquiry {
  id?: number;
  created_at?: string;
  shop_name: string;
  email: string;
  phone?: string | null;
  contact_name: string;
  message: string;
  opt_in_updates: boolean;
}
