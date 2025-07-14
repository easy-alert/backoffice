import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export interface IUpdateBuildingResponse {
  updatedBuilding: any;
  ServerMessage: {
    statusCode: number;
    message: string;
  };
  isBlocked?: boolean;
  [key: string]: any;
}

export async function updateBuildingBlockedStatus(buildingId: string): Promise<IUpdateBuildingResponse | undefined> {
  const uri = '/buildings/changeIsBlockedBuilding';
  
  try {
    const response = await Api.put(uri, { buildingId });
    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    return undefined;
  }
}
