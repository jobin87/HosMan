import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fTime } from 'src/utils/format-time';

import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import store, { useAppSelector } from 'src/store';
import { requestDeleteStaffRoles } from 'src/store/roles/rolesThunk';
import { IPermissions } from 'src/types/permissions';

// ----------------------------------------------------------------------

type Props = {
  row: IPermissions;
  onEditRow?: () => void;
};

export function RolesTableRow({ row, onEditRow }: Props) {
  const { data, loading } = useAppSelector((state) => state.roles.delete);

  const confirm = useBoolean();

  const popover = usePopover();

  const handleDeleteRow = () => {
    store.dispatch(
      requestDeleteStaffRoles({
        id: row.id,
      })
    );
  };

  useEffect(() => {
    if (data?.permissionDeleted) {
      toast.success('Role deleted successfully');
      popover.onClose();
    }
  }, [data]);

  return (
    <>
      <TableRow hover>
        <TableCell>{row?.permissionName}</TableCell>

        <TableCell>
          <ListItemText
            primary={`${fDate(row?.createdAt)}, ${fTime(row?.createdAt)}`}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={`${fDate(row?.updatedAt)}, ${fTime(row?.updatedAt)}`}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>

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
