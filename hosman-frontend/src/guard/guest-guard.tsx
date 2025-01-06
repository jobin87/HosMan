import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';
import { useUser } from 'src/hooks/use-user';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { userLogged, loading } = useUser();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  const checkPermissions = useCallback(async (): Promise<void> => {
    if (userLogged) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  }, [userLogged, returnTo, router]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
