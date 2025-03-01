import type { CountrySelectProps } from 'src/components/country-select';

import { Controller, useFormContext } from 'react-hook-form';

import { CountrySelect } from 'src/components/country-select';

// ----------------------------------------------------------------------

export function RHFCountrySelect({
  name,
  helperText,
  ...other
}: CountrySelectProps & {
  name: string;
}) {
  const { control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CountrySelect
          id={`rhf-country-select-${name}`}
          value={field.value}
          error={!!error}
          helperText={error?.message ?? helperText}
          {...other}
        />
      )}
    />
  );
}
