export interface AIModelCapabilities {
  audio: boolean;

  textToVideo: boolean;
  imageToVideo: boolean;

  firstFrame: boolean;
  lastFrame: boolean;

  maxReferenceImages: number;

  resolutions: string[];

  durations: number[];

  aspectRatios: string[];
}

export interface AIModel {
  id: string;

  name: string;
  description: string;

  features: string[];

  capabilities: AIModelCapabilities;

  pricePerSecond: Record<string, number>;
}

export interface AIModelHome {
  title: string;

  subtitle: string;

  description: string;

  features: string[];
}