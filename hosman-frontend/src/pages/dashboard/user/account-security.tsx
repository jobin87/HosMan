import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { SecurityView } from 'src/sections/account/view/user-security-view';

// ----------------------------------------------------------------

const metadata = { title: `Account | Dashboard - ${CONFIG.appName}` };

export default function Account() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SecurityView />
    </>
  );
}
