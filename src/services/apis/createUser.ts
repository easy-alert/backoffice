import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { ICreateUser } from '@customTypes/IUser';

export async function createUser(data: ICreateUser) {
  const uri = 'account/users/create';

  try {
    const response = await Api.post(uri, data);
    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
