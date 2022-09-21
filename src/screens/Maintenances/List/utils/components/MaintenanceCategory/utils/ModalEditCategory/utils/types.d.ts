import { IModalStates } from '../../../../../../../../../components/Modal/utils/types';
import { ICategories } from '../../../../../types';

interface IFormDataEditCategory {
  categoryName: string;
}

export interface IEditCategory {
  categoryId: string;
  values: IFormDataEditCategory;
  setModalState: (setModalState: boolean) => void;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IDeleteCategory {
  categoryId: string;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IModalCreateMaintenance extends IModalStates {
  categoryId: string;
  categoryName: string;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
}

export interface IRequestCreateMaintenance {
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  setModalState: (setModalState: boolean) => void;
  setOnQuery: (setOnQuery: boolean) => void;
  categoryId: string;
  values: {
    element: string;
    activity: string;
    frequency: string;
    responsible: string;
    source: string;
    period: string;
    delay: string;
    observation: string;
  };
}
