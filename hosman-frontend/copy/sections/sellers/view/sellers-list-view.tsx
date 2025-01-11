import { ISellerDetails } from 'src/types/seller';

import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Tabs from '@mui/material/Tabs';

import { useSetState } from 'src/hooks/use-set-state';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { varAlpha } from 'src/theme/styles';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, useTable } from 'src/components/table';

import { DOCUMENTS_STATUS } from 'src/constants/files.constant';
import { SELLER_STATUS } from 'src/constants/seller.constants';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setSellersStatus } from 'src/store/sellers/sellersReducer';
import { requestSellersList, requestSellersListCount } from 'src/store/sellers/sellersThunk';
import { basicSellerStatusState } from 'src/store/types';
import { SellersTableFiltersResult } from '../sellers-table-filters-result';
import { SellersTableRow } from '../sellers-table-row';
import { SellersTableToolbar } from '../sellers-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sellerName', label: 'Name' },
  { id: 'phone', label: 'Phone number' },
  { id: 'address', label: 'Address' },
  { id: 'sellerType', label: 'Type' },
  { id: 'approvalStatus', label: 'Status' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function SellersListView() {
  const table = useTable();

  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.sellers.list);
  const listCount = useAppSelector((state) => state.sellers.listCount.data);

  const router = useRouter();

  const [tableData, setTableData] = useState<ISellerDetails[]>(data?.sellers);

  const filters = useSetState<any>({
    type: '',
    status: 'ALL',
  });

  const canReset = !!filters.state.type || filters.state.status !== 'ALL';

  const handleViewDetails = useCallback(
    (data: any) => {
      router.push(paths.dashboard.sellers.details(data.id), data);
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      table.onResetPage();
      filters.setState({ status: newValue });
      dispatch(
        requestSellersList({ limit: 10, page: 1, status: newValue, search: filters.state.type })
      );
    },
    [table, filters]
  );

  const handleFilterType = useCallback(
    (params: string) => {
      table.onResetPage();
      dispatch(
        requestSellersList({ limit: 10, page: 1, status: filters.state.status, search: params })
      );
    },
    [filters, table.onResetPage]
  );

  useEffect(() => {
    if (data == null)
      dispatch(requestSellersList({ limit: 10, page: 1, status: 'ALL', search: '' }));
    else setTableData(data?.sellers);
  }, [data]);

  useEffect(() => {
    if (listCount == null) dispatch(requestSellersListCount());
    dispatch(setSellersStatus(basicSellerStatusState));
  }, []);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Sellers List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Sellers', href: paths.dashboard.sellers.root },
            { name: 'List' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters?.state?.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {DOCUMENTS_STATUS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={(tab.value === SELLER_STATUS.ALL && 'filled') || 'soft'}
                    color={
                      (tab.value === SELLER_STATUS.APPROVED && 'success') ||
                      (tab.value === SELLER_STATUS.PENDING && 'warning') ||
                      (tab.value === SELLER_STATUS.DECLINED && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === SELLER_STATUS.ALL && listCount?.counts?.allSellersCount}
                    {tab.value === SELLER_STATUS.PENDING && listCount?.counts?.pendingSellersCount}
                    {tab.value === SELLER_STATUS.UNDERVERIFICATION &&
                      listCount?.counts?.underVerificationSellersCount}
                    {tab.value === SELLER_STATUS.DECLINED &&
                      listCount?.counts?.rejectedSellersCount}
                    {tab.value === SELLER_STATUS.APPROVED &&
                      listCount?.counts?.approvedSellersCount}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <SellersTableToolbar filters={filters} handleFilterType={handleFilterType} />

          {canReset && (
            <SellersTableFiltersResult
              filters={filters}
              totalResults={tableData?.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1150 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {tableData
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <SellersTableRow
                        key={row.id}
                        row={row}
                        onViewDetails={() => handleViewDetails(row)}
                      />
                    ))}

                  <TableNoData notFound={!data?.isData} loading={loading} columns={TABLE_HEAD} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          {/* <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered?.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          /> */}
        </Card>
      </DashboardContent>
    </>
  );
}
