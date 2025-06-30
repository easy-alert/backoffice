import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

export async function getFeedItems() {
  const api = '/feed-items';

  try {
    const response = await Api.get(api);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return null;
  }
}
