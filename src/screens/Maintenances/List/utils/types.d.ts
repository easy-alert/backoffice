/* eslint-disable @typescript-eslint/no-explicit-any */

// MAINTENANCES
interface IMaintenanceHistory {
  id: string;
  maintenanceId: string;
  element: string;
  activity: string;
  frequency: string;
  FrequencyTimeInterval: {
    name: string;
  };
  responsible: string;
  source: string;
  period: string;
  PeriodTimeInterval: {
    name: string;
  };
  delay: string;
  DelayTimeInterval: {
    name: string;
  };
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
