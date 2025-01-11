import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------

const metadata = { title: `Account | Dashboard - ${CONFIG.appName}` };

export default function Account() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <AccountView />
    </>
  );
}
