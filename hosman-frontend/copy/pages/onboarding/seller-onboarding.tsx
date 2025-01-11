import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { OnBoardingFormView } from 'src/sections/onboarding/view/onboarding-form-view';

// ----------------------------------------------------------------
const metadata = { title: `Seller | Onboarding - ${CONFIG.appName}` };

export default function SellerOnboarding() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <OnBoardingFormView />
    </>
  );
}
