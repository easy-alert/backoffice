interface TranslationMap {
  [key: string]: string;
}

export function handleTranslate(key: string): string {
  const translations: TranslationMap = {
    alert: 'alerta',
    announcement: 'anúncio',
    news: 'notícia',
    tutorial: 'tutorial',
    platformVideo: 'vídeo da plataforma',
    promotion: 'promoção',
    event: 'evento',
    feature: 'funcionalidade',
    maintenance: 'manutenção',
    draft: 'rascunho',
    published: 'publicado',
    archived: 'arquivado',
  };

  // Check if the key exists in the translations map
  if (!Object.prototype.hasOwnProperty.call(translations, key)) {
    console.warn(`Translation for key "${key}" not found.`);
    return key; // Return the key itself if no translation is found
  }

  return translations[key];
}
