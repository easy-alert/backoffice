export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  lastAccess?: string;
  role?: string;
  phoneNumber?: string;
  isBlocked?: boolean;
}

export interface UpdateUserValues {
  id: string;
  image: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
  isBlocked: boolean;
}

export interface IUpdateUserResponse {
  updatedUser: IUser;
  ServerMessage: {
    statusCode: number;
    message: string;
  };
  role?: string;
  phoneNumber?: string;
}

export interface ICreateUser {
  name: string;
  image?: string;
  role: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
