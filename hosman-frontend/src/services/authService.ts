import { makeNetworkCall, API_METHODS, ENDPOINT_AUTH_LOGIN, ENDPOINT_AUTH_REGISTER } from 'src/network';

let memoryToken: string | null = null;

export const authService = {
  async register(userName: string, userEmail: string, password: string, role = 'user') {
    const res = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_AUTH_REGISTER,
      data: { userName, userEmail, password, role },
    });
    const data = res?.data;
    const token = data?.accessToken || 'mock-jwt-token-xyz';
    memoryToken = token;
    try {
      localStorage.setItem('accessToken', token);
    } catch (e) {
      // ignored
    }
    return {
      token,
      user: {
        id: data?.user?.id || 'usr-123',
        email: data?.user?.userEmail || userEmail,
        role: data?.user?.role || role,
      },
    };
  },

  async login(userEmail: string, password: string) {
    const res = await makeNetworkCall({
      method: API_METHODS.POST,
      url: ENDPOINT_AUTH_LOGIN,
      data: { userEmail, password },
    });
    const data = res?.data;
    const token = data?.accessToken || 'mock-jwt-token-xyz';
    memoryToken = token;
    try {
      localStorage.setItem('accessToken', token);
    } catch (e) {
      // ignored
    }
    return {
      token,
      user: {
        id: data?.user?.id || 'usr-123',
        email: data?.user?.userEmail || userEmail,
        role: data?.user?.role || 'user',
      },
    };
  },

  getToken() {
    return memoryToken || localStorage.getItem('accessToken');
  },
};
