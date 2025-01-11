import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductReviewView } from 'src/sections/product/view/review-list-view';

// ----------------------------------------------------------------

const metadata = { title: `Product Review | Dashboard - ${CONFIG.appName}` };

export default function ProductsReview() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductReviewView />
    </>
  );
}
