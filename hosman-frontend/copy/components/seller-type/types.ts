import type { SxProps, TextFieldProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { sellerTypes } from 'src/assets/data/seller-types';

export type SellerTypeProps = Omit<TextFieldProps, 'onChange' | 'ref'> & {
  value: string;
  disableSelect?: boolean;
  onChange: (newValue: string | null) => void;
  sellerType: string;
};

export type SellerListProps = {
  sx?: SxProps<Theme>;
  currentType: string;
  searchType: string;
  onClickSellerType: (inputValue: string) => void;
  onSearchSellerType: (inputValue: string) => void;
};

export type ApplyFilterProps = {
  inputData?: typeof sellerTypes;
  query: string;
};
