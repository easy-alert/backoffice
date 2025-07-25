import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function updateGuaranteeSystem(id: string, values: { name: string }) {
  const api = `/guarantee/systems/${id}`;

  const body = {
    systemName: values.name,
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
