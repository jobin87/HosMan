import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, CardHeader, Divider } from '@mui/material';
import { EmptyContent } from 'src/components/empty-content';
import { useAppSelector } from 'src/store';
import { SellersDocumentWidget } from './sellers-document-widget';

// ----------------------------------------------------------------------

export function SellersDetailsOnboardingDocuments() {
  const { sellerStatus } = useAppSelector((state) => state.sellers);

  return (
    <Box>
      <Card sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Documents" sx={{ px: 3, py: 3, pb: 0 }} />
        <Divider />

        <Box p={3} pt={0}>
          <Grid container spacing={3}>
            {!sellerStatus?.currentDocuments?.length ? (
              <Box sx={{ width: '100%', textAlign: 'center', my: 3 }}>
                <EmptyContent title="No Documents Found!" />
              </Box>
            ) : (
              sellerStatus?.currentDocuments?.map((doc) => (
                <Grid xs={12} md={4}>
                  <SellersDocumentWidget data={doc} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
