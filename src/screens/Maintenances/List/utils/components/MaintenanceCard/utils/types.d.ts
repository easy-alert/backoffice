import { ITimeInterval } from '../../../../../../../utils/types';
import { IMaintenance } from '../../../types';

export interface IMaintenanceCard {
  maintenance: IMaintenance;
  timeIntervals: ITimeInterval[];
}
