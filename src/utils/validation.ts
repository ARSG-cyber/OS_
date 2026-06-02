// Validation utilities for forms and data
export const validation = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isPassword: (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  },

  isPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^[\d\s+\-()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  },

  isURL: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isEmpty: (value: any): boolean => {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  },

  isNumber: (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  between: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },
};

// Error handling utilities
export const errorHandler = {
  getErrorMessage: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.response?.statusText) return error.response.statusText;
    return 'An unexpected error occurred';
  },

  isNetworkError: (error: any): boolean => {
    return !error.response || error.code === 'ERR_NETWORK';
  },

  isValidationError: (error: any): boolean => {
    return error?.response?.status === 400 || error?.response?.status === 422;
  },

  isAuthError: (error: any): boolean => {
    return error?.response?.status === 401 || error?.response?.status === 403;
  },

  isNotFoundError: (error: any): boolean => {
    return error?.response?.status === 404;
  },

  isServerError: (error: any): boolean => {
    return error?.response?.status >= 500;
  },
};

// Type guards
export const typeGuards = {
  isString: (value: any): value is string => typeof value === 'string',
  isNumber: (value: any): value is number => typeof value === 'number',
  isBoolean: (value: any): value is boolean => typeof value === 'boolean',
  isObject: (value: any): value is object => typeof value === 'object' && value !== null,
  isArray: (value: any): value is any[] => Array.isArray(value),
  isFunction: (value: any): value is Function => typeof value === 'function',
};
