/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategories } from '../../../types';

export interface IMaintenanceCategory {
  category: ICategories;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
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
