import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function deleteGuaranteeSystem(id: string) {
  const api = `/guarantee/systems/${id}`;

  try {
    const response = await Api.delete(api);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
