import { Api } from '@services/api';
import type { IBuildingType } from '@utils/types';
import { handleToastify } from '@utils/toastifyResponses';

export const getBuildingTypes = async (): Promise<IBuildingType[]> => {
  const uri = '/buildings/types/list';

  try {
    const response = await Api.get(uri);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    return [];
  }
};
