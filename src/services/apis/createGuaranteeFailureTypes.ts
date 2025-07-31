import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function createGuaranteeFailureTypes(values: { failureTypes: string | string[] }) {
  const api = '/guarantee/failure-types';

  const body = {
    failureTypes: values.failureTypes,
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
