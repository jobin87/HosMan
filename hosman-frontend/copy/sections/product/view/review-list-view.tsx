import type { GridColDef } from '@mui/x-data-grid';

import type { IProductItem } from 'src/types/product';

import Card from '@mui/material/Card';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useState } from 'react';

import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';
import { sampleProductItem } from 'src/assets/data/sample-product';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { paths } from 'src/routes/paths';
import {
  RenderCellNo,
  RenderCellPercentage,
  RenderCellProduct,
  RenderCellRating,
  RenderCellTotalReview,
} from '../review-table-row';

// -----------------------------------------------------------------

const CATEGORY_OPTIONS = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'devices', label: 'Devices' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'homeAppliances', label: 'Home Appliances' },
];

export function ProductReviewView() {
  const [tableData, setTableData] = useState<IProductItem[]>(sampleProductItem);

  const [selectedCategory, setSelectedCategory] = useState<string>('clothing');

  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
    // Apply category filter if needed
  };

  const columns: GridColDef[] = [
    {
      field: 'Name',
      headerName: 'S.NO',
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (productParams) => <RenderCellNo params={productParams.row} />, // Assuming averageRating is available in your data
    },
    {
      field: 'name',
      headerName: ' Category :',
      width: 340,
      hideable: false,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Category :</span>
          <FormControl variant="outlined" sx={{ minWidth: 150, marginLeft: '10px' }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              sx={{
                height: '2rem',
                borderRadius: '10px',
                '& .MuiSelect-root': {
                  padding: '6px 12px',
                },
                '&.Mui-focused': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ),

      renderCell: (productParams) => (
        <RenderCellProduct
          params={productParams.row}
          onViewRow={() => console.log('params.row.id')}
        />
      ),
    },
    {
      field: 'totalRatings',
      headerName: 'Average Rating',
      width: 130,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (productParams) => <RenderCellRating params={productParams.row} />, // Assuming averageRating is available in your data
    },
    {
      field: 'inventoryType',
      headerName: 'Selling-Percentage',
      width: 160,
      type: 'singleSelect',
      disableColumnMenu: true,
      sortable: false,
      valueOptions: PRODUCT_PUBLISH_OPTIONS,
      renderCell: (productParams) => <RenderCellPercentage params={productParams.row} />,
    },
    {
      field: 'totalReviews',
      headerName: 'Total-Reviews',
      width: 140,
      editable: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (productParams) => <RenderCellTotalReview params={productParams.row} />,
    },
  ];

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Reviews"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Product', href: paths.dashboard.product.list },
          { name: 'Reviews', href: paths.dashboard.product.review.list },
          { name: 'List' },
        ]}
      />
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800, md: 'auto' },
          flexDirection: { md: 'column' },
          mt: 4,
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            width: '100%',
            height: '100%',
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
