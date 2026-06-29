export interface AIModel {
  id: string;
  name: string;
  description: string;
  features: string[];

  // Стоимость генерации (USD / секунда)
  pricePerSecond: number;

  // Только для моделей, где цена зависит от аудио
  pricePerSecondWithAudio?: number;
  pricePerSecondWithoutAudio?: number;
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
      id: "bytedance/seedance-1.5-pro",
      name: "Seedance 1.5 Pro",
      description:
        "Высококачественная модель ByteDance с поддержкой генерации видео с аудио и без аудио.",
      features: [
        "Image → Video",
        "Audio",
        "720p / 1080p",
        "Highest quality",
      ],

      // Цена зависит от наличия аудио
      pricePerSecond: 0,
      pricePerSecondWithAudio: 0.05184,
      pricePerSecondWithoutAudio: 0.02592,
    },

    {
      id: "bytedance/seedance-2.0-fast",
      name: "Seedance 2.0 Fast",
      description:
        "Ускоренная версия Seedance 2.0. Оптимальный баланс между скоростью и стоимостью.",
      features: [
        "Image → Video",
        "720p / 1080p",
        "Fast generation",
      ],

      pricePerSecond: 0.121,
    },

    {
      id: "bytedance/seedance-2.0",
      name: "Seedance 2.0",
      description:
        "Флагманская модель ByteDance для создания видео максимального качества.",
      features: [
        "Image → Video",
        "Audio",
        "Reference Images",
        "720p / 1080p",
        "Best quality",
      ],

      pricePerSecond: 0.1512,
    },
  ] satisfies AIModel[],
};