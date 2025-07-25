import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function updateGuaranteeFailureType(id: string, values: { name: string }) {
  const api = `/guarantee/failure-types/${id}`;

  const body = {
    failureTypeName: values.name,
  };

  try {
    const response = await Api.put(api, body);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
