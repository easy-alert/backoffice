/* eslint-disable @typescript-eslint/no-explicit-any */

// Maintenances
export interface MaintenancesHistory {
  id: string;
  maintenanceId: string;
  element: string;
  activity: string;
  frequency: number;
  responsible: string;
  source: string;
  period: number;
  delay: number;
  observation: string;
  createdAt: string;
  updatedAt: string;
}
export interface Maintenance {
  id: string;
  MaintenancesHistory: MaintenancesHistory[];
}
export interface ICategories {
  id: string;
  name: string;
  Maintenances: Maintenance[];
}

export interface IRequestCategories {
  setLoading: (setLoading: boolean) => void;
  setCategories: (setCategories: ICategories[]) => void;
}

export interface IFormDataCategory {
  name: string;
}

export interface IRequestCreateCategory {
  values: IFormDataCategory;
  setCreateMaintenancesIsOpen: (setCreateMaintenancesIsOpen: boolean) => void;
  categories: ICategories[] | null;
  setCategories: (setCategories: ICategories[]) => void;
  resetForm: any;
}
