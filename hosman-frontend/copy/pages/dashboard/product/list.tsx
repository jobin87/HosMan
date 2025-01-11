import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductListView } from 'src/sections/product/view';

// ----------------------------------------------------------------

const metadata = { title: `Product List | Dashboard - ${CONFIG.appName}` };

export default function ProductsList() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductListView />
    </>
  );
}
