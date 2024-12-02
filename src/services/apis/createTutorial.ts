import { toast } from 'react-toastify';

import { Api } from '@services/api';

import { catchHandler } from '@utils/functions';

import type { ITutorial } from '@customTypes/ITutorial';

export async function createTutorial(values: ITutorial) {
  const api = '/tutorials';

  let thumbnailUrl = '';

  if (!values.thumbnail) {
    const splittedUrl = values.url.split('/');
    const videoId = splittedUrl[splittedUrl.length - 1];

    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  const body = {
    title: values.title,
    description: values.description,
    url: values.url,
    thumbnail: thumbnailUrl,
    type: values.type,
    order: values.order,
  };

  try {
    const response = await Api.post(api, body);

    toast.success(response.data.ServerMessage.message);
  } catch (error) {
    catchHandler(error);
  }
}
