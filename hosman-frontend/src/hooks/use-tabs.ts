import { useCallback, useMemo, useState } from 'react';

// ----------------------------------------------------------------------

export type UseTabsReturn = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
};

// Initialize with a single string from an array of default values
export function useTabs(defaultValues: string): UseTabsReturn {
  const [value, setValue] = useState(defaultValues[0] || ''); // Default to first item in array or empty string

  const onChange = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }, []);

  const memoizedValue = useMemo(() => ({ value, setValue, onChange }), [onChange, value]);

  return memoizedValue;
}
