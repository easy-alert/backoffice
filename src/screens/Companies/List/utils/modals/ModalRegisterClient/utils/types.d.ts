import { Dispatch, SetStateAction } from 'react';

export interface IModalPreRegistrationClient {
  setModal: Dispatch<SetStateAction<boolean>>;
  setCompanies?: Dispatch<SetStateAction<any[] | null>>;
  page?: number;
  setCount?: Dispatch<SetStateAction<number>>;
}

export interface IInternalFormData {
  name: string;
  clientType: string;
  condosQty: number;
  plan: string;
  monthlyValue: string | number;
  implementationValue: string | number;
  implementationDueDate: string;
}

export interface IRequestGenerateLink {
  formData: IInternalFormData;
  setOnQuery: Dispatch<SetStateAction<boolean>>;
  setGeneratedLink: Dispatch<SetStateAction<string>>;
}
