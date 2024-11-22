/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategories, ICategoriesOptions } from '../../../types';
import { ITimeInterval } from '../../../../../../../utils/types';
import { IMaintenancePriority } from '../../../../../../../types/IMaintenancePriority';

export interface IMaintenanceCategory {
  category: ICategories;
  categories: ICategories[];
  setCategories: React.Dispatch<React.SetStateAction<ICategories[]>>;
  timeIntervals: ITimeInterval[];
  categoriesOptions: ICategoriesOptions[];
  maintenancePriorities: IMaintenancePriority[];
}

export interface ISortType {
  type: 'none' | 'element' | 'activity' | 'frequency' | 'responsible' | 'source';
}

export interface ISortArray {
  category: ICategories;
  isSorted: boolean;
  setIsSorted: (setIsSorted: boolean) => void;
  toSortString: string;
  defaultSortedColumn?: boolean;
}
