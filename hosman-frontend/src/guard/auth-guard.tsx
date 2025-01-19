import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { SplashScreen } from 'src/components/loading-screen';
import { useUser } from 'src/hooks/use-user';
// import { SERVICE_STATUS } from 'src/constants/service.constants';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { loading, userLogged } = useUser();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = useCallback(() => {
    if (!userLogged) {
      const href = `${paths.auth.signIn}?${createQueryString('returnTo', pathname)}`;
      router.replace(href);
      return;
    }

    // if (!sellerDetails?.isSellerApproved) {
    //   // if (sellerDetails?.approvalStatus === SERVICE_STATUS.DECLINED) {
    //   //   router.replace(paths.onboarding.root);
    //   //   setIsChecking(false);
    //   //   return;
    //   // }

    //   // if (sellerDetails?.approvalStatus === SERVICE_STATUS.UNDERVERIFICATION) {
    //   //   router.replace(paths.onboarding.root);
    //   //   setIsChecking(false);
    //   //   return;
    //   // }

    //   // if (sellerDetails?.approvalStatus === SERVICE_STATUS.PENDING) {
    //   //   //PENDING
    //   //   // if (pathname?.split('/')?.[1] === 'onboarding') {
    //   //   //   setIsChecking(false);
    //   //   //   return;
    //   //   // } else {
    //   //   //   router.replace(paths.onboarding.form);
    //   //   //   setIsChecking(false);
    //   //   //   return;
    //   //   // }
    //   // }
    // }

    setIsChecking(false);
  }, [userLogged, createQueryString, pathname, router]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
