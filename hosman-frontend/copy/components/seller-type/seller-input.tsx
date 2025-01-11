import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Iconify } from '../iconify';
import { SellerTypeListPopover } from './list';
import type { SellerTypeProps } from './types';

export const SellerTypeInput = forwardRef<HTMLDivElement, SellerTypeProps>(
  (
    {
      sx,
      size,
      value,
      label,
      onChange,
      placeholder = 'Select seller type',
      disableSelect = false,
      variant = 'outlined',
      sellerType: inputSellerType,
      ...other
    },
    ref
  ) => {
    const [searchSellerType, setSearchSellerType] = useState('');
    const [selectedSellerType, setSelectedSellerType] = useState(inputSellerType || '');

    useEffect(() => {
      setSelectedSellerType(value || '');
    }, [value]);

    const handleClear = useCallback(() => {
      setSelectedSellerType('');
      onChange(null);
    }, [onChange]);

    const hasLabel = !!label;

    return (
      <Box
        sx={{
          '--popover-button-mr': '12px',
          '--popover-button-height': '22px',
          '--popover-button-width': variant === 'standard' ? '48px' : '60px',
          position: 'relative',
          [`& .${inputBaseClasses.input}`]: {
            pl: 'calc(var(--popover-button-width) + var(--popover-button-mr))',
          },
          ...sx,
        }}
      >
        {!disableSelect && (
          <SellerTypeListPopover
            searchType={searchSellerType}
            currentType={selectedSellerType}
            onClickSellerType={(inputValue) => {
              setSelectedSellerType(inputValue), onChange(inputValue);
            }}
            onSearchSellerType={(inputValue) => setSearchSellerType(inputValue)}
            sx={{
              pl: variant === 'standard' ? 0 : 1.5,
              ...(variant === 'standard' && hasLabel && { mt: size === 'small' ? '16px' : '20px' }),
              ...((variant === 'filled' || variant === 'outlined') && {
                mt: size === 'small' ? '8px' : '16px',
              }),
              ...(variant === 'filled' && hasLabel && { mt: size === 'small' ? '21px' : '25px' }),
            }}
          />
        )}

        <TextField
          ref={ref}
          size={size}
          label={label}
          value={selectedSellerType}
          variant={variant}
          placeholder={placeholder}
          InputLabelProps={{ shrink: true }}
          disabled
          InputProps={{
            endAdornment: selectedSellerType && (
              <InputAdornment position="end">
                <IconButton size="small" edge="end" onClick={handleClear}>
                  <Iconify width={16} icon="mingcute:close-line" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      </Box>
    );
  }
);
