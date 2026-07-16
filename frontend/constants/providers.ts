import { KLING } from "./models/kling";
import { SEEDANCE } from "./models/seedance";

export const VIDEO_PROVIDERS = [
  {
    id: "seedance",
    name: "Seedance",
    ...SEEDANCE,
  },

  {
    id: "kling",
    name: "Kling",
    ...KLING,
  },
] as const;