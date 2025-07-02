import { IUpdateBuildingData } from '@customTypes/IBuilding';
import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IPutEditBuildingParams {
  buildingId: string;
  buildingData: Partial<IUpdateBuildingData>;
}

export async function putEditBuilding({ buildingId, buildingData }: IPutEditBuildingParams) {
  const uri = `buildings/edit/${buildingId}`;

  try {
    const response = await Api.put(uri, buildingData);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
