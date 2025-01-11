import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import ProductBrandCreateEditForm from '../product-brand-create-edit-form';

export function ProductBrandCreateView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Create New Brand"
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
            { name: 'Create' },
          ]}
          sx={{ mb: { xs: 3 } }}
        />

        <ProductBrandCreateEditForm />
      </DashboardContent>
    </>
  );
}
