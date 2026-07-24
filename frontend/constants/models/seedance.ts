import {
  AIModel,
  AIModelHome,
} from "./types";

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
      id: "seedance-2.0",

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

      capabilities: {
        audio: true,

        textToVideo: true,
        imageToVideo: true,

        firstFrame: true,
        lastFrame: true,

        maxReferenceImages: 6,

        resolutions: [
          "480p",
          "720p",
          "1080p",
          "4K",
        ],

        durations: [
          4, 5, 6, 7, 8, 9,
          10, 11, 12, 13, 14, 15,
        ],

        aspectRatios: [
          "16:9",
          "9:16",
          "1:1",
        ],
      },

      pricePerSecond: {
        "480p": {
          video: 0.06725,
          audio: 0.06725,
        },

        "720p": {
          video: 0.15125,
          audio: 0.15125,
        },

        "1080p": {
          video: 0.34,
          audio: 0.34,
        },

        "4K": {
          video: 1.36,
          audio: 1.36,
        },
      },
    },
  ] satisfies AIModel[],
};