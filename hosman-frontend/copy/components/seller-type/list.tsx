import {
  Box,
  ButtonBase,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  TextField,
} from '@mui/material';

import { sellerTypes } from 'src/assets/data/seller-types';

import { usePopover } from '../custom-popover';
import { Iconify } from '../iconify';
import { SearchNotFound } from '../search-not-found';
import { applyFilter } from './utils';

import type { SellerListProps } from './types';

export function SellerTypeListPopover({
  sx,
  currentType,
  searchType,
  onClickSellerType,
  onSearchSellerType,
}: SellerListProps) {
  const popover = usePopover();

  const dataFiltered = applyFilter({
    inputData: sellerTypes,
    query: searchType,
  });

  const notFound = dataFiltered?.length === 0 && !!searchType;

  const renderButton = (
    <ButtonBase
      disableRipple
      onClick={popover.onOpen}
      sx={{
        zIndex: 9,
        display: 'flex',
        position: 'absolute',
        justifyContent: 'flex-start',
        width: 'var(--popover-button-width)',
        height: 'var(--popover-button-height)',
        ...sx,
      }}
    >
      <Iconify
        icon="eva:chevron-down-fill"
        sx={{ ml: 0.25, flexShrink: 0, color: 'text.disabled' }}
      />
    </ButtonBase>
  );

  const renderList = (
    <MenuList>
      {dataFiltered?.map((sellerType) => (
        <MenuItem
          key={sellerType.value}
          selected={currentType === sellerType.value}
          onClick={() => {
            popover.onClose();
            onSearchSellerType('');
            onClickSellerType(sellerType.value);
          }}
        >
          <ListItemText
            primary={sellerType.value}
            primaryTypographyProps={{ noWrap: true, typography: 'body2' }}
            secondaryTypographyProps={{ typography: 'caption' }}
          />
        </MenuItem>
      ))}
    </MenuList>
  );
  return (
    <>
      <Popover
        disableRestoreFocus
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={() => {
          popover.onClose();
          onSearchSellerType('');
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 1,
              height: 320,
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box sx={{ px: 1, py: 1.5 }}>
          <TextField
            autoFocus
            fullWidth
            value={searchType}
            onChange={(event) => onSearchSellerType(event.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: searchType && (
                <InputAdornment position="end">
                  <IconButton size="small" edge="end" onClick={() => onSearchSellerType('')}>
                    <Iconify width={16} icon="mingcute:close-line" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ flex: '1 1 auto', overflowX: 'hidden' }}>
          {notFound ? <SearchNotFound query={searchType} sx={{ px: 2, pt: 5 }} /> : renderList}
        </Box>
      </Popover>
      {renderButton}
    </>
  );
}
