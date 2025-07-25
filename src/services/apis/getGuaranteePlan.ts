import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IGuarantee } from '@customTypes/IGuarantee';

interface IGetGuaranteePlan {
  companyId: string[];
}

export async function getGuaranteePlan({
  companyId,
}: IGetGuaranteePlan): Promise<{ guarantees: IGuarantee[] }> {
  const api = '/guarantee/plan';

  const params = {
    companyId: companyId.length === 0 ? '' : companyId.join(','),
  };

  try {
    const response = await Api.get<{ guarantees: IGuarantee[] }>(api, { params });

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {
      guarantees: [],
    };
  }
}
