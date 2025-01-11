import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import { requestDeleteProductCategory } from 'src/store/products/productThunk';
import { IProductCategoryItem } from 'src/types/product';

// ----------------------------------------------------------------------

type Props = {
  row: IProductCategoryItem;
  onViewDetails: (id: string) => void;
  parentId?: string | null | undefined;
};

export function ProductCategoryTableRow({ row, onViewDetails, parentId }: Props) {
  const popover = usePopover();
  const confirm = useBoolean();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        requestDeleteProductCategory({ id: row?.id, parentId: parentId || '' })
      );
      if (response?.payload.categoryDeleted) confirm.onFalse();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleTriggerDetails = () => {
    onViewDetails(row?.id);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar
              alt={row?.categoryName}
              src={row?.categoryImage}
              variant="rounded"
              sx={{ width: 64, height: 64, mr: 2, objectFit: 'cover' }}
            />
            <Stack
              sx={{
                typography: 'body2',
                flex: '1 1 auto',
                alignItems: 'flex-start',
              }}
            >
              <Link
                onClick={handleTriggerDetails}
                color="inherit"
                sx={{ cursor: 'pointer' }}
                variant="subtitle1"
              >
                {row?.categoryName}
              </Link>
              <Typography color="inherit" sx={{ cursor: 'pointer' }} variant="body2">
                category
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {dayjs(row?.createdAt).format('DD-MM-YYYY')}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {dayjs(row?.updatedAt).format('DD-MM-YYYY')}
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
          {!row?.categoryParent && (
            <MenuItem
              onClick={() => {
                popover.onClose();
                onViewDetails(row?.id);
              }}
            >
              <Iconify icon="iconamoon:eye" />
              View sub categories
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.dashboard.product.category.edit(row?.id));
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
        content={`Are you sure want to delete ${row?.categoryName} ?`}
        action={
          <LoadingButton loading={loading} variant="contained" color="error" onClick={handleDelete}>
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
