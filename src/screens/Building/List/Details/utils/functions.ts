import { Api } from '@services/api';
import type { IBuildingDetails } from './types';

export const requestBuildingDetails = async (buildingId: string): Promise<IBuildingDetails> => {
  const uri = `/buildings/list/details/${buildingId}`;
  const response = await Api.get(uri);
  return response.data;
};
