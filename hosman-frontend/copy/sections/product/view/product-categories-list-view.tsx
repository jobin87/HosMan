import { Box, Button, Card, Table, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, useTable } from 'src/components/table';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestDetailsProductCategory,
  requestProductCategoryList,
} from 'src/store/products/productThunk';
import { ProductCategoryTableRow } from '../product-category-table-row';

export function ProductCategoriesListView() {
  const table = useTable();

  const params = useParams() || null;

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { data, loading } = useAppSelector((state) => state.products.category);

  const [parentData, setParentData] = useState<any | null>(null);

  const getParentDetails = async (id: string) => {
    const response = await requestDetailsProductCategory(id);
    if (response) {
      setParentData(response);
    }
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(requestProductCategoryList(params?.id));
      getParentDetails(params?.id);
    } else {
      dispatch(requestProductCategoryList(null));
      setParentData(null);
    }
  }, [params?.id]);

  const TABLE_HEAD = [
    { id: 'categoryId', label: params?.id ? 'Sub Category Name' : 'Category Name' },
    { id: 'created', label: 'Created Date' },
    { id: 'updated', label: 'Updated Date' },
    { id: '', width: 100 },
  ];

  console.log(params);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading={params?.id ? 'Sub Categories' : 'Categories'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Products',
              href: paths.dashboard.product.root,
            },
            {
              name: 'category',
              href: paths.dashboard.product.category.list,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.category.create(params?.id || '')}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {params?.id !== null ? 'New Sub Category' : 'New Category'}
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Box sx={{ position: 'relative' }}>
            <Scrollbar sx={{ minHeight: 444 }}>
              <Table
                size={table.dense ? 'small' : 'medium'}
                sx={{ minWidth: { xs: 'auto', lg: 1150 } }}
              >
                <TableHeadCustom headLabel={TABLE_HEAD} sx={{ whiteSpace: 'nowrap' }} />

                <TableBody>
                  {data?.categories
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any, index: number) => (
                      <ProductCategoryTableRow
                        row={row}
                        key={index}
                        parentId={params?.id}
                        onViewDetails={(id: string) => {
                          router.push(paths.dashboard.product.category.subcategory(id, row));
                        }}
                      />
                    ))}
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
