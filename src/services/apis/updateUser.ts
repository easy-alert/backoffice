import { UpdateUserValues, IUpdateUserResponse } from '@customTypes/IUser';
import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export async function updateUser(data: UpdateUserValues): Promise<IUpdateUserResponse | null> {
  const uri = '/account/users/editUser';

  try {
    const response = await Api.put(uri, data);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
