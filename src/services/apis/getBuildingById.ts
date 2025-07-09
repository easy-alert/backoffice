import { IBuilding } from '@customTypes/IBuilding';
import { Api } from '@services/api';

export interface IGetBuildingByIdProps {
  buildingId: string;
}

export const getBuildingById = async ({
  buildingId,
}: IGetBuildingByIdProps): Promise<IBuilding> => {
  const uri = `/buildings/list/details/${buildingId}`;

  const response = await Api.get(uri);
  return response.data;
};
