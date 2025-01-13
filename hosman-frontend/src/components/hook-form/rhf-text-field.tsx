import React from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export const RHFTextField = React.forwardRef<HTMLInputElement, Props>(
  ({ name, helperText, type, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error?.message ?? helperText}
            inputRef={ref}  // Forwarded ref attached here
            inputProps={{
              autoComplete: 'off',
            }}
            {...other}
          />
        )}
      />
    );
  }
);

RHFTextField.displayName = 'RHFTextField';
