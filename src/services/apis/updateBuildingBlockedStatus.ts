import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

interface IUpdateBuildingResponse {
  updatedBuilding: any;
  ServerMessage: {
    statusCode: number;
    message: string;
  };
}

export const updateBuildingBlockedStatus = async (buildingId: string) => {
  const uri = '/buildings/changeIsBlockedBuilding';
  const payload = { buildingId };

  try {
    const { data } = await Api.put<IUpdateBuildingResponse>(uri, payload);

    const serverResponse = {
      status: data.ServerMessage.statusCode,
      statusCode: data.ServerMessage.statusCode,
      message: data.ServerMessage.message,
      data: {
        ServerMessage: {
          message: data.ServerMessage.message,
        },
      },
    };

    handleToastify(serverResponse);
    return data.updatedBuilding;
  } catch (error: any) {
    handleToastify(error.response?.data?.ServerMessage);
    throw error;
  }
};