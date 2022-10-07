/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICompany } from '../../List/utils/types';

export interface IRequestChangeIsActive {
  company: ICompany;
  setCompany: (setCompany: ICompany) => void;
  navigate: any;
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IRequestChangeIsDeleted {
  company: ICompany;
  navigate: any;
  setOnQuery: (setOnQuery: boolean) => void;
}
