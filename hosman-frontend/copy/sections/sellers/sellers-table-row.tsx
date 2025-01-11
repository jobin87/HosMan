import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { DOCUMENTS_STATUS } from 'src/constants/files.constant';
import { SELLER_STATUS, SELLER_TYPES } from 'src/constants/seller.constants';
import { ISellerDetails } from 'src/types/seller';

// ----------------------------------------------------------------------

type Props = {
  row: ISellerDetails;
  onViewDetails: () => void;
};

export function SellersTableRow({ row, onViewDetails }: Props) {
  const popover = usePopover();

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row?.sellerName} src={row?.logo} />

            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Link color="inherit" sx={{ cursor: 'pointer' }}>
                {row?.sellerName}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row?.sellerEmail}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.fullPhoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.address}</TableCell>

        <TableCell>{SELLER_TYPES.find((item) => item.value === row.sellerType)?.label}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.approvalStatus === SELLER_STATUS.APPROVED && 'success') ||
              (row.approvalStatus === SELLER_STATUS.PENDING && 'warning') ||
              (row.approvalStatus === SELLER_STATUS.DECLINED && 'error') ||
              'default'
            }
          >
            {DOCUMENTS_STATUS.find((item) => item.value === row.approvalStatus)?.label}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onViewDetails();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View Details
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
