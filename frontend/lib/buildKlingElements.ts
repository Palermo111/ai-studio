import { Element } from "@/types/element";

interface KlingElement {
  element_name: string;
  frontal_image: string;
  refer_images: string[];
}

interface BuildKlingElementsResult {
  prompt: string;
  klingElements: KlingElement[];
}

export function buildKlingElements(
  prompt: string,
  elements: Element[]
): BuildKlingElementsResult {
  if (elements.length === 0) {
    return {
      prompt,
      klingElements: [],
    };
  }

  let transformedPrompt = prompt;

  const klingElements: KlingElement[] = [];

  for (const element of elements) {
    const mention = `@${element.name}`;

    if (!transformedPrompt.includes(mention)) {
      continue;
    }

    klingElements.push({
      element_name: element.name,
      frontal_image: element.mainReference ?? "",
      refer_images: element.references,
    });

    const placeholder = `<<<element_${klingElements.length}>>>`;

    transformedPrompt = transformedPrompt
      .split(mention)
      .join(placeholder);
  }

  return {
    prompt: transformedPrompt,
    klingElements,
  };
}