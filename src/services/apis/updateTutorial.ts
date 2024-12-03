import { toast } from 'react-toastify';

import { Api } from '@services/api';

import { catchHandler } from '@utils/functions';

import type { ITutorial } from '@customTypes/ITutorial';

export async function updateTutorial(id: string, values: ITutorial) {
  const api = `/tutorials/${id}`;

  const body = {
    title: values.title,
    description: values.description,
    url: values.url,
    thumbnail: values.thumbnail,
    type: values.type,
    order: values.order,
  };

  try {
    const response = await Api.put(api, body);

    toast.success(response.data.ServerMessage.message);
  } catch (error) {
    catchHandler(error);
  }
}
