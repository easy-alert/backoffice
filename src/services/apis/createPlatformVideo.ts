import { Api } from '@services/api';

import type { IPlatformVideo } from '@customTypes/IPlatformVideo';
import { handleToastify } from '@utils/toastifyResponses';

export async function createPlatformVideo(values: IPlatformVideo) {
  const api = '/platform-videos';

  let thumbnailUrl = '';

  if (!values.thumbnail && values.youtubeId) {
    thumbnailUrl = `https://img.youtube.com/vi/${values.youtubeId}/hqdefault.jpg`;
  } else if (values.thumbnail) {
    thumbnailUrl = values.thumbnail;
  }

  const body = {
    title: values.title,
    description: values.description,
    url: values.url,
    youtubeId: values.youtubeId,
    thumbnail: thumbnailUrl,
    order: values.order,
    type: values.type,
    status: values.status,
    tags: values.tags,
    publishedAt: values.publishedAt,
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
