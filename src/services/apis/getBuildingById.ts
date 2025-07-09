import { IBuilding } from '@customTypes/IBuilding';
import { Api } from '@services/api';
import { IBuildingType } from '@utils/types';

export const getBuildingById = async (buildingId: string): Promise<IBuilding> => {
  const uri = `/buildings/list/details/${buildingId}`;
  const response = await Api.get(uri);
  return response.data;
};

export const getBuildingTypes = async (): Promise<IBuildingType[]> => {
  const response = await Api.get('/buildings/types/list');
  return response.data;
};
