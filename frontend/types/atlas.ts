export interface AtlasElement {
  reference_type: "image_refer" | "video_refer";

  frontal_image?: string;

  refer_images?: string[];

  refer_videos?: string[];

  element_name?: string;

  element_description?: string;

  element_id?: number;
}

export interface AtlasShot {
  prompt: string;

  duration: number;
}

export interface AtlasRequest {
  model: string;

  prompt?: string;

  negative_prompt?: string;

  image: string;

  end_image?: string;

  duration?: number;

  resolution?: string;

  cfg_scale?: number;

  sound?: boolean;

  multi_shot?: boolean;

  shot_type?: "customize" | "intelligence";

  multi_prompt?: AtlasShot[];

  elements?: AtlasElement[];
}