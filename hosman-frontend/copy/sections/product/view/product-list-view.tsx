import type {
  GridColDef,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import type { IProductItem, IProductTableFilters } from 'src/types/product';

import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useSetState } from 'src/hooks/use-set-state';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import {
  RenderCellCreatedAt,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellPublish,
  RenderCellStock,
} from '../product-table-row';

// ----------------------------------------------------

const ACTIVE_OPTIONS = [
  { value: 'active', label: 'inactive' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// -----------------------------------------------------------------

export function ProductListView() {
  const router = useRouter();

  const [tableData, setTableData] = useState<IProductItem[] | null>(null);

  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const filters = useSetState<IProductTableFilters>({ publish: [], stock: [] });

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category', filterable: false },
    {
      field: 'name',
      headerName: 'Product',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct
          params={params}
          onViewRow={() => console.log('params.row.id')}
          //  onViewRow={() => handleViewRow(params.row.id)}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Create at',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'inventoryType',
      headerName: 'Stock',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: ACTIVE_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          // onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          // onClick={() => {
          //     handleDeleteRow(params.row.id);
          // }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Product List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.list },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.product.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New product
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
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          // rows={dataFiltered}
          columns={columns}
          // loading={productsLoading}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          // onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
          // columnVisibilityModel={columnVisibilityModel}
          // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
          slots={
            {
              // toolbar: CustomToolbarCallback as GridSlots['toolbar'],
              // noRowsOverlay: () => <EmptyContent />,
              // noResultsOverlay: () => <EmptyContent title="No results found" />,
            }
          }
          // slotProps={{
          //     panel: { anchorEl: filterButtonEl },
          //     toolbar: { setFilterButtonEl },
          //     columnsManagement: { getTogglableColumns },
          // }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              alignItems: 'center',
              display: 'inline-flex',
            },
            '&.MuiDataGrid-root .MuiDataGrid-columnHeader:active .MuiDataGrid-columnHeader:focus,  &.MuiDataGrid-root .MuiDataGrid-cell:focus':
              {
                outline: 'none',
              },
          }}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IProductItem[];
  filters: IProductTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  // if (publish.length) {
  //     inputData = inputData.filter((product) => publish.includes(product.publish));
  // }

  return inputData;
}
