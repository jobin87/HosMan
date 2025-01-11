import { Controller, useFormContext } from 'react-hook-form';

import { SellerTypeInput } from '../seller-type';

import type { SellerTypeProps } from '../seller-type/types';

// ----------------------------------------------------------------

type Props = Omit<SellerTypeProps, 'value' | 'onChange'> & {
  name: string;
};

export function RHFSellerType({ name, helperText, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <SellerTypeInput
          {...field}
          fullWidth
          value={field.value}
          onChange={(newValue) => setValue(name, newValue)}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
