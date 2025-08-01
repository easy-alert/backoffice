import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function deleteGuarantee(id: string) {
  const api = `/guarantee/plan/${id}`;

  try {
    const response = await Api.delete(api);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
