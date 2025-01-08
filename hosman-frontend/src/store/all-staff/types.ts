interface IAllStaffLocation {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: number[];
  metro: number;
  area: number;
}

interface IAllStaffSession {
  sessionId: string;
  deviceId: string;
  browserName: string;
  browserVersion: string;
  platform: string;
  ipAddress: string;
  location: IAllStaffLocation;
}

export interface IAllStaffListTypes {
  id: string;
  email: string;
  countryCode: string;
  phone: string;
  fullPhoneNumber: string;
  permissionId: string;
  sessions: IAllStaffSession[];
}

export interface IAllStaffCreateTypes {
  name: string;
  email: string;
  countryCode: any;
  phone: string;
  permissionId: string;
}

export interface IAllStaffEditTypes {
  staffId: string;
  name: string;
  countryCode: string;
  phone: string;
  permissionId: string;
}

export interface IAllStaffDetailsTypes {
  staffId?: string;
  id: string;
  email: string;
  countryCode: string;
  phone: string;
  fullPhoneNumber: string;
  permissionId: string;
  sessions: IAllStaffSession[];
}
