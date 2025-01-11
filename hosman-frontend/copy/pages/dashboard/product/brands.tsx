import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { ProductBrandListView } from 'src/sections/product/view/product-brand-list-view';
// ----------------------------------------------------------------
const metadata = { title: `Product Brands | ${CONFIG.appName}` };

export default function ProductBrands() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <ProductBrandListView />
    </>
  );
}
