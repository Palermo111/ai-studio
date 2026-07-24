import {
  AIModel,
  AIModelHome,
} from "./types";

export const KLING = {
  home: {
    title: "Kling",

    subtitle:
      "Профессиональная модель генерации видео от Kuaishou",

    description:
      "Последняя версия Kling 3.0 автоматически подбирает оптимальную модель в зависимости от выбранного качества и режима генерации.",

    features: [
      "text-to-video",
      "image-to-video",
      "keyframes",
      "генерация с аудио",
      "кинематографичное движение",
      "высокое качество",
    ],
  } satisfies AIModelHome,

  models: [
    {
      id: "kling-v3",

      name: "Kling 3.0",

      description:
        "Kling 3.0 с автоматическим выбором модели Standard, Pro или 4K.",

      features: [
        "Text → Video",
        "Image → Video",
        "Keyframes",
        "Audio",
      ],

      capabilities: {
        audio: true,

        textToVideo: true,
        imageToVideo: true,

        firstFrame: true,
        lastFrame: true,

        maxReferenceImages: 4,

        resolutions: [
          "720p",
          "1080p",
          "4K",
        ],

        durations: [
          3, 4, 5, 6, 7,
          8, 9, 10, 11, 12,
          13, 14, 15,
        ],

        aspectRatios: [
          "16:9",
          "9:16",
          "1:1",
        ],
      },

      pricePerSecond: {
        "720p": {
          video: 0.0714,
          audio: 0.1071,
        },

        "1080p": {
          video: 0.0952,
          audio: 0.1428,
        },

        "4K": {
          video: 0.357,
          audio: 0.357,
        },
      },
    },
  ] satisfies AIModel[],
};