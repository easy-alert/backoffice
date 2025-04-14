export interface IUserCompany {
  id: string;
  name: string;
  image?: string;
  isBlocked?: boolean;
}

export interface IUserDetails {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  createdAt?: string;
  lastAccess?: string;
  image?: string;
  companies?: IUserCompany[];
}
