import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function createGuaranteeSystems(values: { systems: string | string[] }) {
  const api = '/guarantee/systems';

  const body = {
    systems: values.systems,
  };

  try {
    const response = await Api.post(api, body);

    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
