import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import TreatmentListView from 'src/sections/treatment/view/treatment-view';

const metadata = { title: `All Staff | Staff | Settings - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TreatmentListView/>
    </>
  );
}
