import type { UseSetStateReturn } from 'src/hooks/use-set-state';
import type { ISellerTableFilters } from 'src/types/seller';

import { useEffect, useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: UseSetStateReturn<ISellerTableFilters>;
  handleFilterType: (params: string) => void;
};

export function SellersTableToolbar({ filters, handleFilterType }: Props) {
  const [query, setQuery] = useState<string>(filters?.state?.type || '');

  useEffect(() => {
    handleFilterType(filters.state.type);
    if (filters.state.type === '') {
      setQuery('');
    }
  }, [filters.state.type]);

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                filters.setState({ type: (event.target as HTMLInputElement).value });
              } else if (event.key === 'Backspace') {
                if (query.length === 1) {
                  filters.setState({ type: '' });
                }
              }
            }}
            placeholder="Type and press enter to seach"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
