import { Box, Button, Card, Table, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, useTable } from 'src/components/table';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useAppDispatch, useAppSelector } from 'src/store';
import { requestProductBrandsList } from 'src/store/products/productThunk';
import { IBrandItem } from 'src/types/product';
import { ProductBrandTableRow } from '../product-table-brand-row';

// ----------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'brandName', label: 'Brand' },
  { id: 'brandWebsite', label: 'Website' },
  { id: 'brandDescription', label: 'Description' },
  { id: '', width: 100 },
];

//----------------------------------------------------------------

export function ProductBrandListView() {
  const table = useTable();

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.products.brands);
  const [tableData, setTableData] = useState<IBrandItem[]>([]);

  useEffect(() => {
    setTableData(data?.brands);
  }, [data]);

  useEffect(() => {
    dispatch(requestProductBrandsList());
  }, []);
  console.log(data?.brands);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Brands List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Products',
              href: paths.dashboard.product.root,
            },
            {
              name: 'Brands',
              href: paths.dashboard.product.brands.list,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.brands.create}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Brand
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <Box sx={{ position: 'relative' }}>
            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1150 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                <TableBody>
                  {tableData
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => <ProductBrandTableRow row={row} />)}
                  <TableNoData notFound={!data?.isData} loading={loading} columns={TABLE_HEAD} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
        </Card>
      </DashboardContent>
    </>
  );
}
