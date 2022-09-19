import { IModalStates } from '../../../../../../../../../components/Modal/utils/types';
import {
  ICompany,
  IFormDataCompany,
} from '../../../../../../../../Companies/List/utils/types';

export interface IModalCreateCompanyAndOwner extends IModalStates {
  selectedMaintenance: any;
}

export interface IRequestCreateCompanyAndOWner {
  setCount: (setCount: number) => void;
  page: number;
  setCompanies: (setCompanies: ICompany[]) => void;

  data: IFormDataCompany;
  setOnQuery: (setOnQuery: boolean) => void;
  setModalState: (setModalState: boolean) => void;
}
