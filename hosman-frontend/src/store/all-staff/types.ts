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
export interface ITreatmentTypes {
  specialization: string;
    department: string;
    treatment:  string;
    price: number;

}

export interface adddoctorTypes {
  doctorName: string;
  specialization: string;
  experience: string;
  contactNumber: string;
  doctorRegId: string;
  // status: string
 
}
export interface staffTypes {
  staffType:string;
  Name: string;
  department: string;
  experience: number;
  contactNumber: number;
  staffRegId: string;

}

export interface DoctorsList  {
  doctorName: string;
  specialization: string;
  experience: string;
  contactNumber: string;
  doctorRegId: string;
  status: string
 
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
