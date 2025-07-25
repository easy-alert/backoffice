import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function deleteGuaranteeFailureType(id: string) {
  const api = `/guarantee/failure-types/${id}`;

  try {
    const response = await Api.delete(api);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
