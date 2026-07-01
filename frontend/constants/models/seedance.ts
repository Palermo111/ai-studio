export interface AIModel {
  id: string;
  name: string;
  description: string;
  features: string[];

  // Стоимость генерации (USD / секунда)
  // Ключ = разрешение
  pricePerSecond: Record<string, number>;
}

export interface AIModelHome {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export const SEEDANCE = {
  home: {
    title: "Seedance",

    subtitle:
      "Продвинутая модель генерации видео от ByteDance",

    description:
      "Seedance 2.0 — продвинутая модель генерации видео от TikTok для динамичного сторителлинга, плавной анимации и быстрой работы с визуальным контентом. Поддерживает текстовый промпт и мультимодальный ввод: до 6 изображений, 3 видео и 2 аудио в одном сценарии генерации.",

    features: [
      "image-to-video",
      "video-to-video",
      "генерация с аудио",
      "работа с несколькими референсами",
      "динамичный сторителлинг",
      "быстрая обработка",
    ],
  } satisfies AIModelHome,

  models: [
    {
      id: "bytedance/seedance-2.0",

      name: "Seedance 2.0",

      description:
        "Флагманская модель ByteDance для создания видео максимального качества.",

      features: [
        "Image → Video",
        "Audio",
        "Reference Images",
        "480p / 720p / 1080p / 4K",
        "Best quality",
      ],

      // Реальные тарифы,
      // подтвержденные тестами через OpenRouter
      pricePerSecond: {
        "480p": 0.06725,
        "720p": 0.15125,
        "1080p": 0.34,
        "4K": 1.36,
      },
    },
  ] satisfies AIModel[],
};