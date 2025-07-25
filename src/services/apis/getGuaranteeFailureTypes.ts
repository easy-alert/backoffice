import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IGetGuaranteeFailureTypes {
  companyId: string[];
}

export async function getGuaranteeFailureTypes({
  companyId,
}: IGetGuaranteeFailureTypes) {
  const api = '/guarantee/failure-types/list';

  const params = {
    companyId: companyId.length === 0 ? '' : companyId.join(','),
  };

  try {
    const response = await Api.get(api, { params });

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return null;
  }
}
