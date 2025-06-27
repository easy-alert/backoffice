import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export async function createUser(data: any) {
  const uri = 'users';

  try {
    const response = await Api.post(uri, data);
    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
