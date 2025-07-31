import type { ICompany } from './ICompany';

export interface IGuaranteeFailureType {
  id?: string;

  companyId?: string;

  name?: string;

  company?: ICompany;

  createdAt?: string;
  updatedAt?: string;
}
