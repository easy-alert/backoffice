import type { IBuilding } from '@customTypes/IBuilding';
import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export interface IGetBuildingByIdProps {
  buildingId: string;
}

export const getBuildingById = async ({
  buildingId,
}: IGetBuildingByIdProps): Promise<IBuilding | null> => {
  const uri = `/buildings/list/details/${buildingId}`;

  try {
    const response = await Api.get(uri);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    return null;
  }
};
