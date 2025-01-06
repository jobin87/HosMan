import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { DeviceSessionPage } from 'src/sections/account/device-session-view';

// ----------------------------------------------------------------

const metadata = { title: `Account | Dashboard - ${CONFIG.appName}` };

export default function Account() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <DeviceSessionPage />
    </>
  );
}
