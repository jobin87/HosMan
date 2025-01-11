import { Box, Card, CardProps, IconButton, MenuItem, MenuList, Typography } from '@mui/material';
import React from 'react';
import { DocumentPreviewDialog } from 'src/components/custom-dialog/document-preview-dialog';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';

import { SvgColor } from 'src/components/svg-color';
import { CONFIG } from 'src/config-global';
import { DOCUMENTS_STATUS } from 'src/constants/files.constant';
import { SELLER_STATUS } from 'src/constants/seller.constants';
import { useAppDispatch } from 'src/store';
import { requestDocumentUpdate } from 'src/store/app/appThunk';
import { varAlpha } from 'src/theme/styles';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  data: any;
};

export function SellersDocumentWidget({ sx, data, ...other }: Props) {
  const dispatch = useAppDispatch();
  const popover = usePopover();

  const [openPreview, setOpenPreview] = React.useState(false);

  const color =
    data?.status === SELLER_STATUS.APPROVED
      ? 'success'
      : data?.status === SELLER_STATUS.PENDING
        ? 'warning'
        : data?.status === SELLER_STATUS.DECLINED
          ? 'error'
          : 'info';

  const handleUpdateDocument = async (status: boolean) => {
    try {
      dispatch(
        requestDocumentUpdate({
          sellerId: data?.ownerId,
          id: data?.id,
          status: status ? SELLER_STATUS.APPROVED : SELLER_STATUS.DECLINED,
          docName: data?.docName,
          docSize: data?.docSize,
          lock: status,
          comment: status ? 'Document Approved' : 'Document Declined',
        })
      );
      popover.onClose();
    } catch (error) {
      console.error('Error during updating document in:', error);
    }
  };

  return (
    <Card
      sx={{
        pt: 3,
        pb: 2,
        pl: 3,
        pr: 2.5,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <SvgColor
        src={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
        sx={{
          top: 24,
          right: 20,
          width: 46,
          height: 56,
          position: 'absolute',
          zIndex: 10,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].dark} 100%)`,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          zIndex: 10,
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ typography: 'h6', width: '90%' }}>{data?.docName}</Box>
          <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
            {fData(data?.docSize)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Box>
            <Typography sx={{ display: 'inline-flex' }} variant="subtitle2">
              Status :{' '}
            </Typography>
            <Typography
              sx={{ display: 'inline-flex', ml: 0.5 }}
              variant="subtitle2"
              color={`${color}.main`}
            >
              {DOCUMENTS_STATUS.find((doc) => doc.value === data?.status)?.label}
            </Typography>
          </Box>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Box>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={(e) => {
              setOpenPreview(true);
              popover.onOpen(e);
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Preview
          </MenuItem>
          {!data?.lock && (
            <MenuItem
              onClick={() => {
                handleUpdateDocument(true);
              }}
            >
              <Iconify icon="material-symbols:done-all" />
              Accept Document
            </MenuItem>
          )}
          {!data?.lock && (
            <MenuItem
              onClick={() => {
                handleUpdateDocument(false);
              }}
              disabled={data?.lock}
            >
              <Iconify icon="solar:close-circle-bold" />
              Decline Document
            </MenuItem>
          )}
        </MenuList>
      </CustomPopover>

      <DocumentPreviewDialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        file={data?.docUrl}
        title={data?.docName}
      />

      <Box
        sx={{
          top: -44,
          width: 200,
          zIndex: -1,
          height: 200,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: 'absolute',
          transform: 'rotate(40deg)',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette[color].main} 0%, ${varAlpha(theme.vars.palette[color].mainChannel, 0)} 100%)`,
        }}
      />
    </Card>
  );
}
