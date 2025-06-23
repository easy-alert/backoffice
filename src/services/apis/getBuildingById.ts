import { IBuilding } from '@customTypes/IBuilding';
import { Api } from '@services/api';

export const getBuildingById = async (buildingId: string): Promise<IBuilding> => {
  const uri = `/buildings/list/details/${buildingId}`;
  const response = await Api.get(uri);
  return response.data;
};
