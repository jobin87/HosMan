import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SellersListView } from 'src/sections/sellers/view';

// ----------------------------------------------------------------------

const metadata = {
  title: `Sellers List | Dashboard - ${CONFIG.appName}`,
};

export default function PendingSellers() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SellersListView />
    </>
  );
}
