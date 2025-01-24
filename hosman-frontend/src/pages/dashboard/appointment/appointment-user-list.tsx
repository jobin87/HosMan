import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import AppointmentListView from 'src/sections/appointment/view/appointment-list-view';

const metadata = { title: `All Staff | Staff | Settings - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AppointmentListView/>
    </>
  );
}
