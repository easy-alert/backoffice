import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

import type { IFeedItem } from '@customTypes/IFeedItem';

export async function updateFeedItem(id: string, values: IFeedItem) {
  const api = `/feed-items/${id}`;

  const body = {
    title: values.title,
    description: values.description,
    imageUrl: values.imageUrl,
    videoUrl: values.videoUrl,
    ctaLink: values.ctaLink,
    ctaText: values.ctaText,
    type: values.type,
    isPinned: values.isPinned || false,
    order: values.order || 1,
    startsAt: values.startsAt,
    expiresAt: values.expiresAt,
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
