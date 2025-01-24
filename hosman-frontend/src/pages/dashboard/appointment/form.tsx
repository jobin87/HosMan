import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AppointmentForm } from 'src/sections/appointment/appointment-view';

const metadata = { title: `All Staff | Staff | Settings - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AppointmentForm/>
    </>
  );
}
