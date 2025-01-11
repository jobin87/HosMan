import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import ProductBrandCreateEditForm from '../product-brand-create-edit-form';

export function ProductBrandEditView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Edit Brand"
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
            { name: 'Edit' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <ProductBrandCreateEditForm />
      </DashboardContent>
    </>
  );
}
