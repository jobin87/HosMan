import { Button, Card, CardHeader, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

export function SellerBankDetails() {
  const { state } = useLocation();

  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={12}>
        <Card>
          <CardHeader title="Plan" />
          <Stack spacing={2} sx={{ p: 3, pt: 2, typography: 'body2' }}>
            <Grid container spacing={{ xs: 0.5, md: 2 }}>
              <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                Bank Name
              </Grid>
              <Grid xs={12} md={8} sx={{ color: 'text.primary' }}>
                {state?.bankDetails?.bankName ?? 'No bank details'}
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 0.5, md: 2 }}>
              <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                Branch Name
              </Grid>
              <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
                {state?.bankDetails?.branchName ?? 'No bank details'}
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 0.5, md: 2 }}>
              <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                Account Number
              </Grid>
              <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
                {state?.bankDetails?.accountNumber ?? 'No bank details'}
              </Grid>
            </Grid>

            <Grid container spacing={{ xs: 0.5, md: 2 }}>
              <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                Swift Code
              </Grid>
              <Grid xs={12} md={8}>
                {state?.bankDetails?.swiftCode ?? 'No bank details'}
              </Grid>
            </Grid>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
            <Button disabled variant="contained">
              Change details
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
