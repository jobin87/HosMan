import type { CountrySelectProps } from 'src/components/country-select';

import { Controller, useFormContext } from 'react-hook-form';

import { useEffect } from 'react';
import { CountrySelect } from 'src/components/country-select';

// ----------------------------------------------------------------------

export function RHFCountrySelect({
  name,
  helperText,
  defaultValue,
  ...other
}: CountrySelectProps & {
  name: string;
}) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, [name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CountrySelect
          id={`rhf-country-select-${name}`}
          value={field.value}
          defaultValue={defaultValue}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          error={!!error}
          helperText={error?.message ?? helperText}
          {...other}
        />
      )}
    />
  );
}
