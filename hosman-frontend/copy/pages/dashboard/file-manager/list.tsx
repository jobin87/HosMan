import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { FileManagerView } from 'src/sections/file-manager/view';

// ----------------------------------------------------------------

const metadata = { title: `File Manager | Dashboard - ${CONFIG.appName}` };

export default function FileManager() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <FileManagerView />
    </>
  );
}
