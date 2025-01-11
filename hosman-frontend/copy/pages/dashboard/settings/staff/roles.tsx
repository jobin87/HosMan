import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { RolesListView } from 'src/sections/roles/view';

const metadata = { title: `Roles | Staff | Settings - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RolesListView />
    </>
  );
}
