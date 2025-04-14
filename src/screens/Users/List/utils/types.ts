// TYPES
export interface IUser {
  id: string;
  name: string;
  image?: string;
  phoneNumber?: string;
  email: string;
  status: 'active' | 'inactive' | 'blocked';
  lastAccess: string;
  isBlocked?: boolean;
}

export interface IRequestUsersList {
  page?: number;
  filter?: string;
}
