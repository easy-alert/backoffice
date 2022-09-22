import { IModalStates } from '../../../../../../../../../components/Modal/utils/types';
import { ICategories } from '../../../../../types';
import { ITimeInterval } from '../../../../../../../../../utils/types';

export interface IModalCreateMaintenance extends IModalStates {
  categoryId: string;
  categories: ICategories[];
  setCategories: (setCategories: ICategories[]) => void;
  timeIntervals: ITimeInterval[];
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
    frequencyTimeInterval: string;
    responsible: string;
    source: string;
    period: string;
    periodTimeInterval: string;
    delay: string;
    delayTimeInterval: string;
    observation: string;
  };
}
