import { Box, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { useEffect } from 'react';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { requestSellerOnboardingStatus } from 'src/store/sellers/sellersThunk';
import { DocumentWidget } from '../document-widget';
import { DocumentAddWidget } from '../documet-add-widget';

// ----------------------------------------------------------------------

export function SellerDocumentsListView() {
  const userData = useUser();
  const dispatch = useAppDispatch();

  const { sellerStatus } = useAppSelector((state) => state.sellers);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        await dispatch(requestSellerOnboardingStatus());
      } catch (error) {
        console.log(error);
      }
    };
    getDocuments();
  }, []);

  return (
    <DashboardContent>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Hi , {userData?.sellerDetails?.sellerName} 👋
        </Typography>
        <Typography
          sx={{ color: 'text.secondary' }}
        >{`Let's upload your legal documents for verification!`}</Typography>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ mb: 1, mt: 4 }}>
          Documents LIst
        </Typography>
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            mt: 3,
          }}
        >
          {sellerStatus.currentDocuments?.map((doc, index: number) => (
            <DocumentWidget
              title={doc?.docName}
              documentType={doc?.docName}
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
              status={doc?.status}
            />
          ))}
          {/* <DocumentWidget
                        title="To verify the bla bla"
                        documentType='Document 1'
                        icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
                    />

                    <DocumentWidget
                        title="To verify the bla bla"
                        documentType='Document 2'
                        color="success"
                        icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
                    />

                    <DocumentWidget
                        title="To verify the bla bla"
                        documentType='Document 3'
                        color="secondary"
                        icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
                    /> */}

          <DocumentAddWidget
            title="Add New Document"
            color="error"
            icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
          />
        </Box>
      </Box>
    </DashboardContent>
  );
}
