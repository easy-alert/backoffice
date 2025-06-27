export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  lastAccess?: string;
  role?: string;
  phoneNumber?: string;
}

export interface IFormDataUser {
  name: string;
  image?: string;
  role: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
