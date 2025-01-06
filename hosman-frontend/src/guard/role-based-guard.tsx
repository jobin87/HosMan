import { SELLER_ADMIN_PERMISSIONS } from 'src/guard/permission-group';
import { useAppSelector } from 'src/store';

// ----------------------------------------------------------------------

export type PermissionWrapperProp = {
  currentKey?: string[];
  children: React.ReactNode;
};

export function PermissionWrapper({ children, currentKey }: PermissionWrapperProp) {
  const { permissions, isSellerSuperAdmin, superAdmin } = useAppSelector(
    (state) => state.app.auth.data
  );

  if (superAdmin) {
    return children;
  }

  if (isSellerSuperAdmin && currentKey?.some((key) => SELLER_ADMIN_PERMISSIONS.includes(key))) {
    return children;
  }

  if (!superAdmin && !isSellerSuperAdmin && currentKey?.some((key) => permissions.includes(key))) {
    return children;
  }

  return null;
}
