import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {  GuestGuard } from 'src/guard';
import { DashboardLayout } from 'src/layouts/dashboard';

// Products
import ProductsList from 'src/pages/dashboard/product/list';
import { ProductEditView } from 'src/sections/product/view/product-edit-view';
// Invoice
import InvoiceEdit from 'src/pages/dashboard/invoice/edit';
import Invoice from 'src/pages/dashboard/invoice/list';
import InvoiceCreate from 'src/pages/dashboard/invoice/new';

// Sellers
import SellersList from 'src/pages/dashboard/sellers/list';

// File Manager
import FileManager from 'src/pages/dashboard/file-manager/list';
import { AllStaffCreateView, AllStaffEditView } from 'src/sections/all-staff/view';
import { RolesCreateView, RolesEditView } from 'src/sections/roles/view';

// All Staff
const AllStaffList = lazy(() => import('src/pages/dashboard/settings/staff/all-staff'));

// Roles
const StaffRolesList = lazy(() => import('src/pages/dashboard/settings/staff/roles'));

import { LoadingScreen } from 'src/components/loading-screen';
import { ProductReviewListView } from 'src/sections/product/review-count';
import {
  ProductBrandCreateView,
  ProductBrandEditView,
  ProductCategoryCreateView,
  ProductCategoryEditView,
} from 'src/sections/product/view';
import { ProductCreateView } from 'src/sections/product/view/product-create-view';
import { SellersDetailsView } from 'src/sections/sellers/view';
import { UploadSellerDocumentsView } from 'src/sections/upload-documents/view';

const IndexPage = lazy(() => import('src/pages/dashboard/one'));

const ProductBrands = lazy(() => import('src/pages/dashboard/product/brands'));
const ReviewsList = lazy(() => import('src/pages/dashboard/product/review'));

const ProductCategories = lazy(() => import('src/pages/dashboard/product/categories'));
const UploadDocuments = lazy(() => import('src/pages/dashboard/upload-documents'));

// ----------------------------------------------------------------------

const SettingsAllStaff = lazy(() => import('src/pages/dashboard/settings/staff/all-staff'));
const SettingsStaffRoles = lazy(() => import('src/pages/dashboard/settings/staff/roles'));
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserSecurityPage = lazy(() => import('src/pages/dashboard/user/account-security'));
const DeviceSessionPage = lazy(() => import('src/pages/dashboard/user/device-sessions'));
const GeneralPage = lazy(() => import('src/pages/dashboard/user/general-account'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      // { element: <UserAccountPage />, index: true },
      {
        path: 'user',
        children: [
          { element: <UserAccountPage />, index: true },
          { path: 'account/:tab', element: <UserAccountPage /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'security', element: <UserSecurityPage /> },
          { path: 'device', element: <DeviceSessionPage /> },
          { path: 'general', element: <GeneralPage /> },
        ],
      },
      {
        path: 'documents',
        children: [
          { element: <UploadDocuments />, index: true },
          { path: 'list', element: <UploadDocuments /> },
          { path: 'new', element: <UploadSellerDocumentsView /> },
          { path: ':id/edit', element: <UploadSellerDocumentsView /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductsList />, index: true },
          { path: 'list', element: <ProductsList /> },
          { path: 'new', element: <ProductCreateView /> },
          { path: ':id/edit', element: <ProductEditView /> },
          {
            path: 'category',
            children: [
              { element: <ProductCategories />, index: true },
              { path: 'list', element: <ProductCategories /> },
              { path: 'create/:id', element: <ProductCategoryCreateView /> },
              { path: 'create', element: <ProductCategoryCreateView /> },
              { path: 'list/:id', element: <ProductCategories /> },
              { path: ':id/edit', element: <ProductCategoryEditView /> },
            ],
          },
          {
            path: 'brands',
            children: [
              { element: <ProductBrands />, index: true },
              { path: 'list', element: <ProductBrands /> },
              { path: 'create', element: <ProductBrandCreateView /> },
              { path: 'edit/:id', element: <ProductBrandEditView /> },
            ],
          },
          {
            path: 'review',
            children: [
              { element: <ReviewsList />, index: true },
              { path: 'list', element: <ReviewsList /> },
              { path: 'count/:id', element: <ProductReviewListView /> },
            ],
          },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <Invoice />, index: true },
          { path: 'list', element: <Invoice /> },
          { path: 'new', element: <InvoiceCreate /> },
          { path: ':id/edit', element: <InvoiceEdit /> },
        ],
      },
      {
        path: 'sellers',
        children: [
          { element: <SellersList />, index: true },
          { path: 'list', element: <SellersList /> },
          { path: ':id/details', element: <SellersDetailsView /> },
        ],
      },
      {
        path: 'settings',
        children: [
          { element: <IndexPage />, index: true },
          {
            path: 'staff',
            children: [
              { element: <AllStaffList />, index: true },
              { path: 'list', element: <AllStaffList /> },
              { path: 'create', element: <AllStaffCreateView /> },
              { path: ':id/edit', element: <AllStaffEditView /> },
            ],
          },
          {
            path: 'roles',
            children: [
              { element: <StaffRolesList />, index: true },
              { path: 'list', element: <StaffRolesList /> },
              { path: 'create', element: <RolesCreateView /> },
              { path: ':id/edit', element: <RolesEditView /> },
            ],
          },
        ],
      },
      {
        path: 'fileManager',
        children: [
          { element: <FileManager />, index: true },
          { path: 'list', element: <FileManager /> },
        ],
      },
    ],
  },
];
