import { useState, useCallback } from 'react';

type ErrorState = {
  [key: string]: string | null;
};

export function useFormErrors(initialErrors: ErrorState = {}) {
  const [errors, setErrors] = useState<ErrorState>(initialErrors);

  const setError = useCallback((field: string, message: string | null) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: message,
    }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: null,
    }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    setErrors,
  };
}

