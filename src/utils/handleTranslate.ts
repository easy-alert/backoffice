interface TranslationMap {
  [key: string]: string;
}

export function handleTranslate(key: string): string {
  const translations: TranslationMap = {
    alert: 'Alerta',
    announcement: 'Anúncio',
    news: 'Notícia',
    tutorial: 'Tutorial',
    platformVideo: 'Vídeo da Plataforma',
    promotion: 'Promoção',
    event: 'Evento',
  };

  return translations[key];
}
