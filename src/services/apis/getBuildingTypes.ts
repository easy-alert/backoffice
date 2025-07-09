import { Api } from '@services/api';
import type { IBuildingType } from '@utils/types';

export const getBuildingTypes = async (): Promise<IBuildingType[]> => {
  const uri = '/buildings/types/list';

  const response = await Api.get(uri);
  return response.data;
};
