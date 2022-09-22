import { IModalStates } from '../../../../../../../../../components/Modal/utils/types';
import { ITimeInterval } from '../../../../../../../../../utils/types';
import { IMaintenance } from '../../../../../../utils/types';

export interface IModalEditMaintenance extends IModalStates {
  selectedMaintenance: IMaintenance;
  timeIntervals: ITimeInterval[];
}

export interface IRequestEditMaintenance {
  maintenanceId: string;
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
  setOnQuery: (setOnQuery: boolean) => void;
}

export interface IDeleteMaintenance {
  maintenanceId: string;
  setOnQuery: (setOnQuery: boolean) => void;
}
