import { IModalStates } from '../../../../../../../../../components/Modal/utils/types';
import { IMaintenance } from '../../../../../../utils/types';

export interface IModalEditMaintenance extends IModalStates {
  selectedMaintenance: IMaintenance;
}

export interface IRequestEditMaintenance {
  maintenanceId: string;
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
