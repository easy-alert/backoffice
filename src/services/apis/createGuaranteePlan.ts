import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export interface ICreateGuaranteePlan {
  systemId: string;
  description: string;
  failureTypesIds: string[];
  warrantyPeriod: number;
}

export async function createGuaranteePlan(values: ICreateGuaranteePlan) {
  const api = '/guarantee/plan';

  const body = {
    systemId: values.systemId,
    description: values.description,
    failureTypesIds: values.failureTypesIds,
    warrantyPeriod: values.warrantyPeriod,
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
