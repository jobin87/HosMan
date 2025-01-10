import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ReportListView from 'src/sections/reports/view/reports-list-view';

const metadata = { title: `Reports- ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ReportListView/>
    </>
  );
}
