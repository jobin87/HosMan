import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useBoolean } from 'src/hooks/use-boolean';

import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import store, { useAppSelector } from 'src/store';
import { requestDeleteAllStaff } from 'src/store/all-staff/allStaffThunk';
import { IAllStaffListTypes } from 'src/types/staff';

// ----------------------------------------------------------------------

type Props = {
  row: IAllStaffListTypes;
  onEditRow?: () => void;
};

export function AllStaffTableRow({ row, onEditRow }: Props) {
  const { data, loading } = useAppSelector((state) => state.allstaff.delete);

  const confirm = useBoolean();

  const popover = usePopover();

  const handleDeleteRow = () => {
    store.dispatch(
      requestDeleteAllStaff({
        staffId: row.id,
      })
    );
  };

  useEffect(() => {
    if (data?.staffDeleted) {
      toast.success('Staff deleted successfully');
      popover.onClose();
    }
  }, [data]);

  return (
    <>
      <TableRow hover>
        <TableCell>{row?.name}</TableCell>
        <TableCell>{row?.phone}</TableCell>
        <TableCell>{row?.email}</TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
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
              onEditRow?.();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleDeleteRow}
            loading={loading}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
