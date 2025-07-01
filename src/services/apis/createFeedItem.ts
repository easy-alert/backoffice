import { Api } from '@services/api';

import type { IFeedItem } from '@customTypes/IFeedItem';

import { handleToastify } from '@utils/toastifyResponses';

export async function createFeedItem(values: IFeedItem) {
  const api = '/feed-items';

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
    const response = await Api.post(api, body);

    handleToastify(response);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);

    return {};
  }
}
