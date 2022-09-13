import { IModalStates } from '../../../../../../../components/Modal/utils/types';

export interface IModalCreateCompanyAndOWner extends IModalStates {
  setCount: (setCount: number) => void;
  page: number;
  setCompanies: (setCompanies: ICompany[]) => void;
}

export interface IRequestCreateCompanyAndOWner {
  setCount: (setCount: number) => void;
  page: number;
  setCompanies: (setCompanies: ICompany[]) => void;

  data: IFormDataUser;
  setOnQuery: (setOnQuery: boolean) => void;
  setModalState: (setModalState: boolean) => void;
}
