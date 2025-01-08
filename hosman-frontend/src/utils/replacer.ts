import store from 'src/store';
import { IUserDetails } from 'src/types/user';

export function replaceValues(data: string) {
  const { app } = store.getState();
  const { auth } = app;
  const userDetails: IUserDetails = auth?.data;

  const replacements = [
    {
      data: '{sellerId}',
      value: userDetails?.sellerId,
    },
    {
      data: '{userId}',
      value: userDetails?.userId,
    },
  ];

  replacements.forEach(({ data: placeholder, value }) => {
    data = data.replace(new RegExp(placeholder, 'g'), value);
  });

  return data;
}
