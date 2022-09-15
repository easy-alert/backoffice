import { ICategories } from '../../../types';

export interface IMaintenanceCategory {
  category: ICategories;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
}

interface IFormDataEditCategory {
  name: string;
}

export interface IEditCategory {
  categoryId: string;
  values: IFormDataEditCategory;
  setIsEditingCategoryName: (setIsEditingCategoryName: boolean) => void;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
}

export interface IDeleteCategory {
  categoryId: string;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
}
