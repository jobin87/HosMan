import type { GridCellParams } from '@mui/x-data-grid';

import { useState } from 'react';

import { Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { Typography } from '@mui/material';
import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellPrice({ params }: ParamsProps) {
  return fCurrency(params.row.price);
}

export function RenderCellPublish({ params }: ParamsProps) {
  const [isProductActive, setIsProductActive] = useState<boolean>(params?.row?.active);

  return <Switch checked={isProductActive} onClick={() => setIsProductActive(!isProductActive)} />;
}

export function RenderCellCreatedAt({ params }: ParamsProps) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{fDate(params.row.createdAt)}</Box>
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params.row.createdAt)}
      </Box>
    </Stack>
  );
}

export function RenderCellStock({ params }: ParamsProps) {
  return (
    <Stack justifyContent="center" sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={(params.row.available * 100) / params.row.quantity}
        variant="determinate"
        color={
          (params.row.inventoryType === 'out of stock' && 'error') ||
          (params.row.inventoryType === 'low stock' && 'warning') ||
          'success'
        }
        sx={{ mb: 1, width: 1, height: 6, maxWidth: 80 }}
      />
      {!!params.row.available && params.row.available} {params.row.inventoryType}
    </Stack>
  );
}

export function RenderCellRating({ params }: ParamsProps) {
  const rating = params.row.averageRating ?? 4; // Default to 0 if undefined or null
  const ratingColor = rating >= 4 ? 'success' : rating >= 3 ? 'warning' : 'error';
  return (
    <Stack justifyContent="centre" sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={(rating / 5) * 100} // Rating out of 5, so scale to percentage
        variant="determinate"
        color={ratingColor}
        sx={{ mb: 1, width: 1, height: 6, maxWidth: 80, ml: 2 }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', ml: 3 }}>
        {rating.toFixed(1)} / 5
      </Typography>
    </Stack>
  );
}
export function RenderCellPercentage({ params }: ParamsProps) {
  const percentage = params.row.percentage ?? 60; // Default to 0 if undefined or null

  // Determine the color based on the percentage value
  const percentageColor = percentage >= 80 ? 'success' : percentage >= 50 ? 'warning' : 'error';

  return (
    <Stack justifyContent="center" sx={{ typography: 'caption', color: 'text.secondary' }}>
      {/* LinearProgress bar to represent the percentage */}
      <LinearProgress
        value={percentage}
        variant="determinate"
        color={percentageColor}
        sx={{ mb: 1, width: 1, height: 6, maxWidth: 80, ml: 3 }}
      />
      {/* Display the percentage value as text */}
      <Typography variant="body2" sx={{ color: 'text.secondary', ml: 3 }}>
        {percentage.toFixed(1)}%
      </Typography>
    </Stack>
  );
}
export function RenderCellTotalReview({ params }: ParamsProps) {
  const totalReviews = params.row.totalReviews ?? 0; // Default to 0 if undefined or null

  return (
    <Stack justifyContent="center" alignItems="flex-start">
      {/* Display the review count */}
      <Link
        href="#"
        underline="hover" // Underline appears only on hover
        sx={{ cursor: 'pointer', color: 'text.primary' }}
        onClick={() => {
          // Handle the click event here (e.g., navigate to a review page)
          console.log('Navigate to reviews or show details');
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 2 }}>
          {totalReviews} Reviews
        </Typography>
      </Link>
    </Stack>
  );
}

export function RenderCellProduct({
  params,
  onViewRow,
}: ParamsProps & {
  onViewRow: () => void;
}) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Avatar
        alt={params.row.name}
        src={params.row.coverUrl}
        variant="rounded"
        sx={{ width: 64, height: 64, mr: 2 }}
      />

      <ListItemText
        disableTypography
        secondary={
          <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
            {params.row.category}
          </Box>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}
