import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: { value: string; label: string; total: number }[];
};

export function AnalyticsTrafficBySite({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={3} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((site) => (
          <Box
            key={site.label}
            sx={(theme) => ({
              py: 2.5,
              display: 'flex',
              borderRadius: 1.5,
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              border: `solid 6px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              cursor: 'pointer',
              // Hover effect
              "&:hover": {
                backgroundColor: 'blue', // Change to blue when hovered
                color: 'white', // Change text color to white
                transform: 'scale(1.05)', // Slight zoom effect on hover
              },
              // Optional: Active effect (click effect)
              "&:active": {
                transform: 'scale(0.98)', // Make it feel pressed when clicked
              },
              
            })
          }
          onClick={() => {
            // You can define actions for each item click here
            console.log(`clicked!` );
          }}
          >
            {site.value === 'facebook' && (
              <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />
            )}
            {site.value === 'Appointments' && <Iconify icon="material-symbols:add-notes-outline-rounded" width={32} />}
            {site.value === 'Reports' && (
              <Iconify icon="ic:round-report-gmailerrorred" color="#0A66C2" width={32} />
            )}
            {site.value === 'New-Patients' && <Iconify icon="ep:list" width={32} />}
            {site.value === 'Total-Beds' && (
              <Iconify icon="tabler:emergency-bed" color="#0A66C2" width={32} />
            )}

            <Typography variant="h6" sx={{ mt: 1 }}>
              {fShortenNumber(site.total)}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
