/* eslint-disable @typescript-eslint/no-explicit-any */

// MAINTENANCES
interface IMaintenanceHistory {
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
interface IMaintenance {
  id: string;
  MaintenancesHistory: IMaintenanceHistory[];
}
export interface ICategories {
  id: string;
  name: string;
  Maintenances: IMaintenance[];
}

// REQUESTS
export interface IRequestCategories {
  setLoading?: (setLoading: boolean) => void;
  setCategories: (setCategories: ICategories[]) => void;
  filter?: string;
}
