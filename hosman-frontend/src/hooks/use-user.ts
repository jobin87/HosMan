import { useAppSelector } from 'src/store';

export const useUser = () => {
  const { userLogged, auth } = useAppSelector((state) => state.app);
  const userDetails = auth?.data || {};

  const id = userDetails.id || userDetails.userId || '';
  const email = userDetails.userEmail || userDetails.email || '';
  const name = userDetails.userName || userDetails.name || (email ? email.split('@')[0] : 'User');
  const role = userDetails.role || 'user';
  const userRegNum = userDetails.userRegNum || '';
  const isApproved = userDetails.isApproved !== undefined ? userDetails.isApproved : true;
  const approvedBy = userDetails.approvedBy || (role === 'admin' ? 'Super Admin' : 'System Admin');

  return {
    ...userDetails,
    id,
    name,
    email,
    role,
    userRegNum,
    isApproved,
    approvedBy,
    userLogged,
    loading: auth?.loading,
  };
};
