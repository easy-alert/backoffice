/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModalStates } from '../../../../../../../components/Modal/utils/types';
import { ICompany } from '../../../../../List/utils/types';

export interface IModalEditCompanyAndOwner extends IModalStates {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
}

// REQUESTS
export interface IRequestEditCompanyAndOwner {
  data: IFormDataUser;
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
  setOnQuery: (setOnQuery: boolean) => void;
  navigate: any;
  setModalState: (setModalState: boolean) => void;
}

export interface IRequestChangeIsActiveAndIsDeleted {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
}
