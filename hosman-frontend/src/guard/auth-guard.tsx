import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { SplashScreen } from 'src/components/loading-screen';
import { useUser } from 'src/hooks/use-user';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { loading, userLogged, sellerDetails } = useUser();

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
      setIsChecking(false);
      return;
    }

    setIsChecking(false);
  }, [userLogged, sellerDetails, createQueryString, pathname, router]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
