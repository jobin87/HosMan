import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, CardHeader, Divider } from '@mui/material';
import { EmptyContent } from 'src/components/empty-content';
import { useAppSelector } from 'src/store';

// ----------------------------------------------------------------------

export function SellersDetailsOnboardingQuestions() {
  const { sellerStatus } = useAppSelector((state) => state.sellers);

  return (
    <Box>
      <Card sx={{ gap: 3, mb: 3, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Questions" sx={{ px: 3, pt: 3, pb: 0 }} />
        <Divider />

        <Box p={3} pt={0}>
          <Grid container spacing={3} sx={{ pt: 0 }}>
            {!sellerStatus?.currentQuestions?.length ? (
              <Box sx={{ width: '100%', textAlign: 'center', my: 3 }}>
                <EmptyContent title="No Documents Found!" />
              </Box>
            ) : (
              sellerStatus?.currentQuestions?.map((question: any) => (
                <Grid xs={12} md={12}>
                  <ListItemText
                    primary={question?.label}
                    secondary={question?.answer}
                    primaryTypographyProps={{ typography: 'h6', mb: 0.5 }}
                    secondaryTypographyProps={{ component: 'span' }}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
