import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { CONFIG } from 'src/config-global';
import { SELLER_STATUS } from 'src/constants/seller.constants';
import { useUser } from 'src/hooks/use-user';
import { SignOutButton } from 'src/layouts/components/sign-out-button';
import { useRouter } from 'src/routes/hooks';
import { useAppDispatch } from 'src/store';
import { requestSellerOnboardingStatus } from 'src/store/sellers/sellersThunk';

export function OnboardingStatusView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sellerDetails } = useUser();

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

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: 300 }}>
          <img
            src={
              sellerDetails?.approvalStatus === SELLER_STATUS.UNDERVERIFICATION
                ? `${CONFIG.assetsDir}/assets/images/auth/pending-verification.svg`
                : `${CONFIG.assetsDir}/assets/images/auth/failed-onboarding.svg`
            }
            alt="status"
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {sellerDetails?.approvalStatus === SELLER_STATUS.DECLINED && (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: { xs: 0, lg: 2 } }}>
            Your account registration was not successful.
            <br /> Please contact support for more information.
          </Typography>
        )}

        {sellerDetails?.approvalStatus === SELLER_STATUS.UNDERVERIFICATION && (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: { xs: 0, lg: 2 } }}>
            Your account registration is currently under review.
            <br /> Please bear with us as we complete the verification process.
            <br /> We’ll notify you as soon as it's ready!
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <SignOutButton
          fullWidth={false}
          label="Return to Sign In"
          color={
            sellerDetails?.approvalStatus === SELLER_STATUS.UNDERVERIFICATION ? 'warning' : 'error'
          }
        />
      </Box>
    </Box>
  );
}
