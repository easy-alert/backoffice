/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from '@utils/types';
import type { ICompany } from '@List/utils/types';

export interface ILinkedUsers {
  id: string;
  email: string;
  lastAccess: string;
  name: string;
  owner: boolean;
  image?: string;
}

export interface ILinkedCompanies {
  id: string;
  name: string;
  image?: string;
  Buildings: IBuilding[];
}
export interface IRequestUserDetails {
  setCompany: (company: ICompany) => void;
  setCompanyOwner: (companyOwner: IUser) => void;
  setLoading: (loading: boolean) => void;
  companyId: string;
  setLinkedUsers: (users: ILinkedUsers[]) => void;
  setLinkedCompanies: (companies: ILinkedCompanies[]) => void;
}

export interface IRequestChangeIsActive {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IRequestChangeIsDeleted {
  company: ICompany;
  navigate: any;
  setOnQuery: (setOnQuery: boolean) => void;
}
