export type SignInResponse = {
  success: boolean;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    [key: string]: any;
  };
  [key: string]: any;
};
export type SignInParams = {
    username: string;
    email: string;
    password: string
  };
  export type SignUpParams = {
    username: string;
    email: string;
    password: string,
    confirmPassword: string
  };