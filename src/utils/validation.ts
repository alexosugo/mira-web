// Input sanitization and validation utilities

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    // Add protocol if missing
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    const urlObject = new URL(urlToTest);
    return ['http:', 'https:'].includes(urlObject.protocol);
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove whitespace
  const cleanUrl = url.trim();
  
  // Add https:// if no protocol specified
  if (cleanUrl && !cleanUrl.match(/^https?:\/\//)) {
    return `https://${cleanUrl}`;
  }
  
  return cleanUrl;
};

export const validateInstagramUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  
  try {
    const normalizedUrl = normalizeUrl(url);
    const urlObject = new URL(normalizedUrl);
    return urlObject.hostname === 'instagram.com' || urlObject.hostname === 'www.instagram.com';
  } catch {
    return false;
  }
};

export const validateFormData = (data: any) => {
  const errors: Record<string, string> = {};

  // First Name validation
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  }

  // Last Name validation
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  } else if (data.email.trim().length > 255) {
    errors.email = 'Email address is too long';
  }

  // Website validation
  if (!data.website?.trim()) {
    errors.website = 'Website URL is required';
  } else if (!validateUrl(data.website.trim())) {
    errors.website = 'Please enter a valid website URL';
  } else if (data.website.trim().length > 255) {
    errors.website = 'Website URL is too long';
  }

  // Instagram validation (optional)
  if (data.instagram?.trim()) {
    if (!validateInstagramUrl(data.instagram.trim())) {
      errors.instagram = 'Please enter a valid Instagram URL';
    } else if (data.instagram.trim().length > 255) {
      errors.instagram = 'Instagram URL is too long';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};