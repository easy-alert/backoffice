// TYPES
export interface IUser {
  id: string;
  name: string;
  image?: string;
  phoneNumber?: string;
  email: string;
  lastAccess: string;
  isBlocked: boolean;
}

export interface IRequestUsersList {
  page?: number;
  filter?: string;
}
