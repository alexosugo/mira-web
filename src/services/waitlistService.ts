import { supabase, type WaitlistUser } from '../lib/supabase';
import { sanitizeInput, normalizeUrl, validateFormData } from '../utils/validation';

export interface WaitlistFormData {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  instagram: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

export const submitToWaitlist = async (formData: WaitlistFormData): Promise<SubmissionResult> => {
  try {
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Please fix the errors in your form',
        error: Object.values(validation.errors)[0]
      };
    }

    // Sanitize and prepare data for database
    const sanitizedData: Omit<WaitlistUser, 'id' | 'created_at'> = {
      first_name: sanitizeInput(formData.firstName),
      last_name: sanitizeInput(formData.lastName),
      email: sanitizeInput(formData.email.toLowerCase()),
      website: normalizeUrl(sanitizeInput(formData.website)),
      instagram_url: formData.instagram ? normalizeUrl(sanitizeInput(formData.instagram)) : null
    };

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist_users')
      .select('email')
      .eq('email', sanitizedData.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is what we want
      console.error('Database check error:', checkError);
      return {
        success: false,
        message: 'A technical error occurred. Please try again.',
        error: 'Database connection error'
      };
    }

    if (existingUser) {
      return {
        success: false,
        message: 'This email is already registered for early access.',
        error: 'Email already exists'
      };
    }

    // Insert new waitlist user
    const { data, error: insertError } = await supabase
      .from('waitlist_users')
      .insert([sanitizedData])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      
      // Handle specific database errors
      if (insertError.code === '23505') {
        return {
          success: false,
          message: 'This email is already registered for early access.',
          error: 'Email already exists'
        };
      }
      
      return {
        success: false,
        message: 'A technical error occurred. Please try again.',
        error: insertError.message
      };
    }

    if (!data) {
      return {
        success: false,
        message: 'A technical error occurred. Please try again.',
        error: 'No data returned from insert'
      };
    }

    return {
      success: true,
      message: 'Successfully joined the waitlist! Check your email for confirmation.'
    };

  } catch (error) {
    console.error('Unexpected error in submitToWaitlist:', error);
    
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};