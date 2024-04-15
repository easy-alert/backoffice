/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserCompanies {
  User: {
    id: string;
    name: string;
    email: string;
    lastAccess: string | null;
  };
}

export interface ICompany {
  id: string;
  image: string;
  name: string;
  contactNumber: string;
  CNPJ: string;
  CPF: string;
  isBlocked: boolean;
  createdAt: string;
  isNotifyingOnceAWeek: boolean;
  canAccessChecklists: boolean;
  canAccessTickets: boolean;
  UserCompanies: IUserCompanies[];
}

export interface IRequestUsersList {
  setCompanies: (setCompanies: ICompany[]) => void;
  setLoading?: (setLoading: boolean) => void;
  setPage?: (setPage: number) => void;
  setCount: (setCount: number) => void;
  page: number;
  filter?: string;
}

// YUP
export interface IFormDataCompany {
  image: string;
  name: string;
  email: string;
  companyName: string;
  contactNumber: string;
  CNPJorCPF: string;
  isNotifyingOnceAWeek: string;
  canAccessChecklists: boolean;
  canAccessTickets: boolean;

  password: string;
  confirmPassword: string;
}

export interface IFormDataCompanyForEdit {
  image: string;
  name: string;
  email: string;
  companyName: string;
  contactNumber: string;
  CNPJ: string;
  CPF: string;
  isNotifyingOnceAWeek: string;
  canAccessChecklists: boolean;
  canAccessTickets: boolean;

  password: string;
  confirmPassword: string;
}
