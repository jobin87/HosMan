import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { ProductCategoryCreateForm } from '../product-category-create-form';

export function ProductCategoryCreateView() {
  const params = useParams() || null;
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading={params?.id ? 'Create Sub Category' : 'Create Category'}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.list },
            { name: 'Categories', href: paths.dashboard.product.list },
            {
              name: 'Sub Categories',
              href: paths.dashboard.product.category.subcategory(params?.parentId || ''),
            },
            { name: 'Create' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <ProductCategoryCreateForm />
      </DashboardContent>
    </>
  );
}
