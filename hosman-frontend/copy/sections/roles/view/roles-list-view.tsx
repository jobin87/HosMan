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
  setRolesCreate,
  setRolesDelete,
  setRolesDetails,
  setRolesEdit,
} from 'src/store/roles/rolesReducer';
import { requestStaffRolesList } from 'src/store/roles/rolesThunk';
import { basicInitialState, networkCallInitialState } from 'src/store/types';
import type { IPermissions, IPermissionsTableFilters } from 'src/types/permissions';
import { RolesTableRow } from '../roles-table-row';

const TABLE_HEAD = [
  { id: 'permissionName', label: 'Role Name' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  { id: '', label: '' },
];

export function RolesListView() {
  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createdAt' });

  const { data, loading } = useAppSelector((state) => state.roles.list);
  const deleteData = useAppSelector((state) => state.roles.delete);

  const [tableData, setTableData] = useState<any>(data?.permissions);

  const filters = useSetState<any>({ page: [], limit: [] });

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.settings.roles.edit(id));
    },
    [router]
  );

  useEffect(() => {
    if (data === null) {
      store.dispatch(
        requestStaffRolesList({
          page: 1,
          limit: 10,
          permissionName: '',
        })
      );
    }
  }, [data]);

  useEffect(() => {
    store.dispatch(setRolesDetails(basicInitialState));
    store.dispatch(setRolesCreate(networkCallInitialState));
    store.dispatch(setRolesEdit(networkCallInitialState));
    store.dispatch(setRolesDelete(networkCallInitialState));
  }, []);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Staff Roles List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings', href: paths.dashboard.settings.roles.list },
          { name: 'Staff Roles List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.settings.roles.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Role
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
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 1120 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data?.permissions?.length}
              numSelected={table.selected.length}
            />

            <TableBody>
              {data?.permissions
                ?.slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: IPermissions) => (
                  <RolesTableRow key={row.id} row={row} onEditRow={() => handleEditRow(row.id)} />
                ))}

              <TableNoData notFound={!data?.permissions?.length} />
            </TableBody>
          </Table>
        </Scrollbar>
        {data?.permissions?.length > 0 && [
          <Divider />,
          <TablePaginationCustom
            page={table.page}
            count={data?.permissions?.length}
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
  inputData: IPermissions[];
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
