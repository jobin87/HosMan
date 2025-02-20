import { useAppSelector } from 'src/store';
import { IUserDetails } from 'src/types/user';

export const useStaff = () => {
  const { userLogged, auth } = useAppSelector((state) => state.app);

  const userDetails: IUserDetails = auth?.data;

  console.log('authdata : ', userDetails)

  return {
    ...userDetails,
    userLogged,
    loading: auth?.loading,
  };
};