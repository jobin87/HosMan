import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { ProductCategoriesListView } from 'src/sections/product/view';

// ----------------------------------------------------------------

const metadata = { title: `Product Categories | ${CONFIG.appName}` };

export default function ProductCategories() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ProductCategoriesListView />
    </>
  );
}
