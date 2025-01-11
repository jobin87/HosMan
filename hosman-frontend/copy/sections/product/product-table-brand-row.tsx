import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import { requestProductBrandDelete } from 'src/store/products/productThunk';
import { IBrandItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  row: IBrandItem;
};

export function ProductBrandTableRow({ row }: Props) {
  const popover = usePopover();

  const confirm = useBoolean();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleOpenEditBrand = () => {
    router.push(paths.dashboard.product.brands.edit(row?.id));
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(requestProductBrandDelete(row?.id));
      if (response.payload.brandDeleted) confirm.onFalse();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row?.brandName} src={row?.brandLogo} />
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Link color="inherit" sx={{ cursor: 'pointer' }} variant="h6">
                {row?.brandName}
              </Link>
            </Stack>
          </Stack>
        </TableCell>

        {/* {
                    row?.categoryParent && <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.categor   yParent}</TableCell>
                } */}

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.brandWebsite}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.brandDescription}</TableCell>

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
              popover.onClose();
              handleOpenEditBrand();
            }}
          >
            <Iconify icon="iconamoon:edit-duotone" />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              popover.onClose();
              confirm.onTrue();
            }}
          >
            <Iconify icon="mynaui:trash" color="red" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure want to delete ${row?.brandName} ?`}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
