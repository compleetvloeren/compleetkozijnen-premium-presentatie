// Form validation utilities for consistent validation across forms

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | null;
}

export interface FormValidation {
  [key: string]: ValidationRule;
}

export const validateField = (value: string, rules: ValidationRule): string | null => {
  // Required field check
  if (rules.required && !value.trim()) {
    return 'Dit veld is verplicht';
  }

  // Skip other validations if field is empty and not required
  if (!value.trim() && !rules.required) {
    return null;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Ongeldige invoer';
  }

  // Length validations
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimaal ${rules.minLength} karakters vereist`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximaal ${rules.maxLength} karakters toegestaan`;
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: Record<string, string | boolean>, rules: FormValidation): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(fieldName => {
    const value = data[fieldName];
    const fieldRules = rules[fieldName];
    
    if (typeof value === 'string') {
      const error = validateField(value, fieldRules);
      if (error) {
        errors[fieldName] = error;
      }
    }
  });

  return errors;
};

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  dutchPhone: /^(\+31|0)[6-9][0-9]{8}$/,
  dutchPostalCode: /^[1-9][0-9]{3}\s?[A-Z]{2}$/i,
  name: /^[a-zA-ZÀ-ÿ\s'-]{2,}$/,
};

// Custom validation functions
export const validateEmail = (email: string): string | null => {
  if (!VALIDATION_PATTERNS.email.test(email)) {
    return 'Voer een geldig e-mailadres in';
  }
  return null;
};

export const validateDutchPhone = (phone: string): string | null => {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!VALIDATION_PATTERNS.dutchPhone.test(cleanPhone)) {
    return 'Voer een geldig Nederlands telefoonnummer in';
  }
  return null;
};

export const validateDutchPostalCode = (postalCode: string): string | null => {
  if (!VALIDATION_PATTERNS.dutchPostalCode.test(postalCode)) {
    return 'Voer een geldige Nederlandse postcode in (bijv. 1234 AB)';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (name.length < 2) {
    return 'Naam moet minimaal 2 karakters lang zijn';
  }
  if (!VALIDATION_PATTERNS.name.test(name)) {
    return 'Naam mag alleen letters, spaties, apostrofes en koppeltekens bevatten';
  }
  return null;
};