import type { SxProps, Theme } from '@mui/material/styles';

import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { EmptyContent } from '../empty-content';

// ----------------------------------------------------------------------

export type TableNoDataProps = {
  notFound: boolean;
  loading?: boolean;
  columns?: any[];
  sx?: SxProps<Theme>;
};

export function TableNoData({ notFound, loading, columns, sx }: TableNoDataProps) {
  if (loading) {
    return (
      <TableRow>
        {columns?.map(() => (
          <TableCell sx={{ py: 1 }}>
            {columns?.map(() => (
              <Skeleton variant="rounded" sx={{ my: 2.5, py: 2.25, borderRadius: 1 }} />
            ))}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  if (notFound) {
    return (
      <TableRow>
        <TableCell colSpan={12}>
          <EmptyContent filled sx={{ py: 10, ...sx }} />
        </TableCell>
      </TableRow>
    );
  }

  return null;
}

export type TableLoadingProps = {
  columns: any[];
};

export function TableLoading({ columns }: TableLoadingProps) {
  return (
    <TableRow>
      {[1, 2, 3, 4, 5, 6].map(() => (
        <TableCell sx={{ py: 1 }}>
          {columns?.map(() => (
            <Skeleton variant="rounded" sx={{ my: 2.5, py: 2.25, borderRadius: 1 }} />
          ))}
        </TableCell>
      ))}
    </TableRow>
  );
}
