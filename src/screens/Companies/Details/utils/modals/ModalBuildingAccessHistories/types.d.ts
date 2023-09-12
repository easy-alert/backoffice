/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IModalEditCompanyAndOwner {
  companyId: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRequestCompanyBuildingAccessHistories {
  setData: any;
  companyId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IAccesHistory {
  id: string;
  name: string;
  accessCount: number;
}
