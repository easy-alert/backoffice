import { IUser } from '../../types/types';

// MODALS
export interface IModalEditUser {
  user: IUser;
  setUser: (setUser: IUser) => void;
}

export interface IModalCreateUser {
  setUsers: (setUsers: IUser[]) => void;
  page: number;
  setCount: (setCount: number) => void;
}

// YUP
export interface IFormDataUser {
  name: string;
  email: string;
  image: string;
  password: string;
  confirmPassword: string;
}

// REQUESTS
export interface IRequestEditUser extends IModal {
  toggleModal: () => void;
  data: IFormDataUser;
  user: IUser;
  setUser: (setUser: IUser) => void;
  setOnQuery: (setOnQuery: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: any;
}

export interface IRequestCreateUser extends IModalCreateUser {
  toggleModal: () => void;
  data: IFormDataUser;
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IRequestUsersList {
  setUsers: (setUsers: IUser[]) => void;
  setLoading?: (setLoading: boolean) => void;
  page: number;
  setCount: (setCount: number) => void;
  filter?: string;
  setPage?: (setPage: number) => void;
}

export interface IRequestChangeIsActiveAndIsDeleted {
  user: IUser;
  setUser?: (setUser: IUser) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: any;
}
