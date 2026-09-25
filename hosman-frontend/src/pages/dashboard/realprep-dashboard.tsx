import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { DashboardView } from 'src/sections/dashboard/view/dashboard-view';

const metadata = { title: `Dashboard | ${CONFIG.appName}` };

export default function RealPrepDashboardPage() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <DashboardView />
    </>
  );
}
