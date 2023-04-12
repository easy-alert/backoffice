/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICompany, IFormDataCompanyForEdit } from '../../../../../List/utils/types';

export interface IModalEditCompanyAndOwner {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
  setModal: (setModal: boolean) => void;
}

// REQUESTS
export interface IRequestEditCompanyAndOwner {
  data: IFormDataCompanyForEdit;
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
  setOnQuery: (setOnQuery: boolean) => void;
  setModal: (setModal: boolean) => void;
}

export interface IRequestChangeIsActiveAndIsDeleted {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
}
