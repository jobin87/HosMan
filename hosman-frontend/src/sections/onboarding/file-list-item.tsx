import type { PaperProps } from '@mui/material/Paper';
import type { IFileManager } from 'src/types/file';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Button, Dialog, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { Iconify } from 'src/components/iconify';
import { DOCUMENTS_STATUS } from 'src/constants/files.constant';
import { SELLER_STATUS } from 'src/constants/seller.constants';

// ----------------------------------------------------------------------

type Props = PaperProps & {
  file: IFileManager;
  onDelete: (id: string) => void;
};

type DialogProps = {
  docUrl: string;
  open: boolean;
};

export function FileListItem({ file, onDelete, sx, ...other }: Props) {
  const [openPreviewDialog, setOpenPreviewDialog] = useState<DialogProps>({
    docUrl: '',
    open: false,
  });

  const popover = usePopover();

  const confirm = useBoolean();

  const navigate = useNavigate();

  const openDocument = () => {
    setOpenPreviewDialog({ docUrl: file?.docUrl!, open: true });
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const renderAction = (
    <Box>
      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Box>
  );

  const renderText = (
    <ListItemText
      sx={{ flex: '1 1 auto' }}
      primary={file.docName}
      secondary={
        <>
          {fData(file.docSize)}
          <Box
            sx={{
              mx: 0.75,
              width: 2,
              height: 2,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
          {fDateTime(file.createdAt)}
        </>
      }
      primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  );

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          gap: 2,
          borderRadius: 2,
          display: 'flex',
          cursor: 'pointer',
          position: 'relative',
          bgcolor: 'transparent',
          maxHeight: { xs: 200, lg: 150 },
          p: { xs: 2.5, sm: 2 },
          alignItems: { xs: 'unset', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
          mb: 2,
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file={'pdf'} sx={{ width: 40, height: 40 }} />

        {renderText}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: 3,
          }}
        >
          <Typography
            variant="body2"
            color={
              (file.status === SELLER_STATUS.APPROVED && 'success.main') ||
              (file.status === SELLER_STATUS.PENDING && 'warning.main') ||
              (file.status === SELLER_STATUS.DECLINED && 'error.main') ||
              'default'
            }
          >
            {DOCUMENTS_STATUS.find((item) => item.value === file.status)?.label}
          </Typography>
          {renderAction}
        </Box>
      </Paper>

      {openPreviewDialog.open && (
        <Dialog
          fullScreen
          open={openPreviewDialog.open}
          TransitionComponent={Transition}
          onClose={() => setOpenPreviewDialog({ docUrl: '', open: false })}
        >
          <Box
            color="inherit"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={2}
            py={1}
          >
            <Typography variant="subtitle2">Preview of - {file.docName} -</Typography>
            <Button
              variant="contained"
              onClick={() => setOpenPreviewDialog({ docUrl: '', open: false })}
            >
              {' '}
              <Iconify icon="eva:close-fill" />
            </Button>
          </Box>
          <iframe src={openPreviewDialog.docUrl} width={'100%'} height={'100%'} />
        </Dialog>
      )}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {file.docName} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete(file.id!);
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={() => openDocument()}>
            <Iconify icon="mynaui:eye" />
            Preview
          </MenuItem>
          <MenuItem
            onClick={() => {
              popover.onClose();
              confirm.onTrue();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
