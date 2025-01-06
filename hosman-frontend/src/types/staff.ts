export type IAllStaffTableFilters = {
  page: number;
  limit: number;
};

export type IAllStaffLocation = {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: number[];
  metro: number;
  area: number;
};

export type IAllStaffSession = {
  sessionId: string;
  deviceId: string;
  browserName: string;
  browserVersion: string;
  platform: string;
  ipAddress: string;
  location: IAllStaffLocation;
};

export type IAllStaffListTypes = {
  id: string;
  name?: string;
  email: string;
  countryCode: string;
  phone: string;
  fullPhoneNumber: string;
  permissionId: string;
  sessions: IAllStaffSession[];
};
