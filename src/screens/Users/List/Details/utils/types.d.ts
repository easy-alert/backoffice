import { IUser } from '@utils/types';

export interface IUserCompany {
  id: string;
  name: string;
  image?: string;
  isBlocked?: boolean;
}

export interface IUserEdification {
  id: string;
  name: string;
  image?: string;
}

export interface IUserDetails extends Omit<IUser, 'email' | 'image'> {
  email?: string;
  image?: string;
  phoneNumber?: string;
  role?: string;
  companies?: IUserCompany[];
  edifications?: IUserEdification[];
}
