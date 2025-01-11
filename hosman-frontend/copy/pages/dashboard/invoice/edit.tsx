import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { _invoices } from 'src/_mock/_invoice';
import { CONFIG } from 'src/config-global';

import { InvoiceEditView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

const metadata = { title: `Invoice edit | Dashboard - ${CONFIG.appName}` };

export default function InvoiceEdit() {
  const { id = '' } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <InvoiceEditView invoice={currentInvoice} />
    </>
  );
}
