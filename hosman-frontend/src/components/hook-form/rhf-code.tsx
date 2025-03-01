import type { MuiOtpInputProps } from 'mui-one-time-password-input';

import { Controller, useFormContext } from 'react-hook-form';

import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
};

export function RHFCode({ name }: RHFCodesProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div>

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
