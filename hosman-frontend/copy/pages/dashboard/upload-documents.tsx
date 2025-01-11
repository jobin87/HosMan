import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { SellerDocumentsListView } from 'src/sections/upload-documents/view';

// ----------------------------------------------------------------

const metadata = { title: `Account | Dashboard - ${CONFIG.appName}` };

export default function UploadDocuments() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SellerDocumentsListView />
    </>
  );
}
