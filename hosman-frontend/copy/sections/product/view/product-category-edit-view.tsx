import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { ProductCategoryEditForm } from '../product-category-edit-form';

export function ProductCategoryEditView() {
  const params = useParams() || null;
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading={'Edit'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.list },
            { name: 'Categories', href: paths.dashboard.product.list },
            { name: 'Edit' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <ProductCategoryEditForm />
      </DashboardContent>
    </>
  );
}
