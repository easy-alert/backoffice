import { toast } from 'react-toastify';

import { Api } from '@services/api';

import { catchHandler } from '@utils/functions';

export async function deleteTutorial(id: string) {
  const api = `/tutorials/${id}`;

  try {
    const response = await Api.delete(api);

    toast.success(response.data.ServerMessage.message);
  } catch (error) {
    catchHandler(error);
  }
}
