import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { OnboardingStatusView } from 'src/sections/onboarding/view';

// ----------------------------------------------------------------
const metadata = { title: `Seller Onboarding | Status - ${CONFIG.appName}` };

export default function SellerOnboardingStatus() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <OnboardingStatusView />
    </>
  );
}
