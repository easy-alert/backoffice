import { IRequestChangeIsBlockedBuilding } from '@customTypes/IBuilding';
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
    return data;
  } catch (error: any) {
    handleToastify(error.response?.data?.ServerMessage);
    throw error;
  }
};

export const requestChangeIsBlocked = async ({
  building,
  setBuilding,
  setOnQuery,
}: IRequestChangeIsBlockedBuilding) => {
  if (!building.id) return;

  try {
    setOnQuery(true);
    const data = await updateBuildingBlockedStatus(building.id);
    setBuilding(data.updatedBuilding);

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
  } catch (error: any) {
    console.error('Erro ao alterar status da edificação:', error);
  } finally {
    setOnQuery(false);
  }
};
