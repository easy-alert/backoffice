import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { UpdateUserValues, IUpdateUserResponse } from '@customTypes/IUser';

export async function updateUser(data: UpdateUserValues): Promise<IUpdateUserResponse> {
  const { id, ...updateData } = data;
  const uri = `/account/users/edit/${id}`;

  try {
    const response = await Api.put(uri, updateData);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
