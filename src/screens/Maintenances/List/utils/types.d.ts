/* eslint-disable @typescript-eslint/no-explicit-any */

// MAINTENANCES
interface MaintenanceHistory {
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
interface Maintenance {
  id: string;
  MaintenancesHistory: MaintenanceHistory[];
}
export interface ICategories {
  id: string;
  name: string;
  Maintenances: Maintenance[];
}

// FORM
export interface IFormDataCategory {
  name: string;
}

// REQUESTS
export interface IRequestCategories {
  setLoading: (setLoading: boolean) => void;
  setCategories: (setCategories: ICategories[]) => void;
}

export interface IRequestCreateCategory {
  values: IFormDataCategory;
  setCreateMaintenancesIsOpen: (setCreateMaintenancesIsOpen: boolean) => void;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  resetForm: any;
}
