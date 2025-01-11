import LoadingButton from '@mui/lab/LoadingButton';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { SELLER_STATUS } from 'src/constants/seller.constants';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellersRegistrationApproval,
} from 'src/store/sellers/sellersThunk';
import { SellersDetailsOnboardingDocuments } from './sellers-details-onborading-documents';
import { SellersDetailsOnboardingQuestions } from './sellers-details-onborading-questions';

// ----------------------------------------------------------------------

export function SellersDetailsOnboarding() {
  const { state } = useLocation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { sellerStatus, details } = useAppSelector((state) => state.sellers);

  const handleRegistration = async (status: boolean) => {
    try {
      const response = await dispatch(
        requestSellersRegistrationApproval({
          sellerId: state?.id,
          isApproved: status,
        })
      );
      if (response.payload?.statusUpdated) {
        toast.success('Seller has been registered successfully!');
        setTimeout(() => {
          router.push(paths.dashboard.sellers.list);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(requestSellerOnboardingStatus(state?.id));
  }, []);

  return (
    <Box>
      <SellersDetailsOnboardingQuestions />

      <SellersDetailsOnboardingDocuments />

      {state?.approvalStatus !== SELLER_STATUS.APPROVED && (
        <Box
          pt={3}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', columnGap: 1 }}
        >
          <LoadingButton
            onClick={() => {
              handleRegistration(false);
            }}
            variant="contained"
            color="error"
            loading={false}
          >
            Reject Registration
          </LoadingButton>
          <LoadingButton
            disabled={!sellerStatus?.readyToSendForReview}
            onClick={() => {
              handleRegistration(true);
            }}
            variant="contained"
            color="success"
            loading={false}
          >
            Approve Registration
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
}
