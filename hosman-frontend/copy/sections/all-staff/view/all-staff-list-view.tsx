import { Divider, Table, TableBody } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useCallback, useEffect, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import store, { useAppSelector } from 'src/store';
import {
  setAllStaffCreate,
  setAllStaffDelete,
  setAllStaffDetails,
  setAllStaffEdit,
} from 'src/store/all-staff/allStaffReducer';
import { requestAllStaffList } from 'src/store/all-staff/allStaffThunk';
import { basicInitialState, networkCallInitialState } from 'src/store/types';
import { IPermissions, IPermissionsTableFilters } from 'src/types/permissions';
import type { IAllStaffListTypes } from 'src/types/staff';
import { AllStaffTableRow } from '../all-staff-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'email', label: 'Email' },
  { id: '' },
];

export function AllStaffListView() {
  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createdAt' });

  const { data, loading } = useAppSelector((state) => state.allstaff.list);
  const deleteData = useAppSelector((state) => state.allstaff.delete);

  const [tableData, setTableData] = useState<any>(data);

  const filters = useSetState<any>({ page: [], limit: [] });

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.settings.staff.edit(id));
    },
    [router]
  );

  useEffect(() => {
    if (data === null) {
      store.dispatch(requestAllStaffList());
    }
  }, [data]);

  useEffect(() => {
    store.dispatch(setAllStaffDetails(basicInitialState));
    store.dispatch(setAllStaffCreate(networkCallInitialState));
    store.dispatch(setAllStaffEdit(networkCallInitialState));
    store.dispatch(setAllStaffDelete(networkCallInitialState));
  }, []);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="All Staff List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.roles.list },
          { name: 'All Staff List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.settings.staff.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Staff
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800, md: 2 },
          flexDirection: { md: 'column' },
        }}
      >
        <Scrollbar sx={{ minHeight: 444 }}>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data?.length}
              numSelected={table.selected.length}
            />

            <TableBody>
              {data
                ?.slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: IAllStaffListTypes) => (
                  <AllStaffTableRow
                    key={row.id}
                    row={row}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}
              <TableNoData notFound={!data?.length} />
            </TableBody>
          </Table>
        </Scrollbar>
        {data?.length > 0 && [
          <Divider />,
          <TablePaginationCustom
            page={table.page}
            count={data?.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />,
        ]}
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPermissions;
  filters: IPermissionsTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  // const { stock, publish } = filters;

  // if (stock.length) {
  //   inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  // }

  // if (publish.length) {
  //     inputData = inputData.filter((product) => publish.includes(product.publish));
  // }

  return inputData;
}
