/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICompany } from '../../List/utils/types';

export interface IRequestUserDetails {
  setCompany: (setCompany: ICompany) => void;
  setLoading: (setLoading: boolean) => void;
  companyId: string;
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
