import { IModalStates } from '../../../../../../components/Modal/utils/types';
import { ICategories } from '../../types';

export interface IModalCreateCategory extends IModalStates {
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
}

// FORM
export interface IFormDataCategory {
  categoryName: string;
}

export interface IRequestCreateCategory {
  values: IFormDataCategory;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  setOnQuery: (setOnQuery: boolean) => void;
  setModalState: (setModalState: boolean) => void;
}
