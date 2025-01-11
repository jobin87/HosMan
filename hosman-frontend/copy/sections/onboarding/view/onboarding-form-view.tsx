import { Box } from '@mui/material';
import { useEffect } from 'react';

import { LinearAlternativeLabel } from 'src/components/stepper-view';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingSubmitForRegistration,
} from 'src/store/sellers/sellersThunk';

import { useUser } from 'src/hooks/use-user';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { setOnboardingSteps } from 'src/store/app/appReducer';
import { OnboardingAddress } from '../onboarding-address';
import { OnboardingBank } from '../onboarding-bank';
import { OnboardingDocuments } from '../onboarding-documents';
import { OnboardingGeneral } from '../onboarding-general';
import { OnboardingQuestions } from '../onboarding-questions';
import { OnboardingStoreName } from '../onboarding-storename';
// ----------------------------------------------------------------

const onboardingSteps = [
  'Please answer these questions',
  'Seller account creation',
  'Store name',
  'Pickup address',
  'Bank details',
  'Documents upload',
];

export function OnBoardingFormView() {
  const { sellerDetails } = useUser();

  const router = useRouter();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const dispatch = useAppDispatch();

  const sellerStatus = useAppSelector((state) => state.sellers.sellerStatus);

  const sendDetailsForReview = async () => {
    try {
      const response = await dispatch(requestSellerOnboardingSubmitForRegistration());
      if (response?.payload?.updatedForReview) {
        requestLatestSellerStatus();
        router.push(paths.onboarding.root);
      }
    } catch (error) {
      console.log('error on submit', error);
    }
  };

  const requestLatestSellerStatus = async () => {
    try {
      await dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLatestSellerStatus();
  }, []);

  useEffect(() => {
    if (!sellerStatus?.isQuestionUpdated) {
      dispatch(setOnboardingSteps({ step: 0, enabled: true }));
    } else if (!sellerStatus?.isSellerDetailsUpdated) {
      dispatch(setOnboardingSteps({ step: 1, enabled: true }));
    } else if (!sellerStatus?.isStoreNameUpdated) {
      dispatch(setOnboardingSteps({ step: 2, enabled: true }));
    } else if (!sellerStatus?.isAddressUpdated) {
      dispatch(setOnboardingSteps({ step: 3, enabled: true }));
    } else if (!sellerStatus?.isBankDetailsUpdated) {
      dispatch(setOnboardingSteps({ step: 4, enabled: true }));
    } else if (!sellerStatus?.isDocumentsUpdated) {
      dispatch(setOnboardingSteps({ step: 5, enabled: true }));
    } else dispatch(setOnboardingSteps({ step: 6, enabled: true }));
  }, [sellerStatus]);

  return (
    <Box sx={{ width: { xs: '100%', lg: 'auto' } }}>
      <LinearAlternativeLabel
        steps={onboardingSteps}
        finalStepMessage="You have submitted all the details! Now send it for review."
        finalStepValidation={sellerStatus?.readyToSendForReview}
        finalStepSubmitFunction={() => sendDetailsForReview()}
      >
        {steps.step === 0 && !sellerStatus?.isQuestionUpdated && <OnboardingQuestions />}

        {steps.step === 1 && !sellerStatus?.isSellerDetailsUpdated && <OnboardingGeneral />}

        {steps.step === 2 && !sellerStatus?.isStoreNameUpdated && <OnboardingStoreName />}

        {steps.step === 3 && !sellerStatus?.isAddressUpdated && <OnboardingAddress />}

        {steps.step === 4 && !sellerStatus?.isBankDetailsUpdated && <OnboardingBank />}

        {steps.step === 5 && !sellerStatus?.isDocumentsUpdated && <OnboardingDocuments />}
      </LinearAlternativeLabel>
      {/* <Button onClick={() => {dispatch(setOnboardingSteps({ step: 5, enabled: true }))}}>
        Reset
      </Button> */}
    </Box>
  );
}
