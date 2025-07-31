import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export interface IUpdateGuarantee {
  id: string;
  systemId: string;
  description: string;
  observation: string;
  failureTypesIds: string[];
  warrantyPeriod: number;
}

export async function updateGuarantee(values: IUpdateGuarantee) {
  const api = `/guarantee/plan/${values.id}`;

  const body = {
    systemId: values.systemId,
    description: values.description,
    observation: values.observation,
    failureTypesIds: values.failureTypesIds,
    warrantyPeriod: values.warrantyPeriod,
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
