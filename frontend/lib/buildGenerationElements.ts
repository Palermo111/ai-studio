import { Element } from "@/types/element";

interface BuildGenerationElementsResult {
  prompt: string;
  elements: Element[];
}

export function buildGenerationElements(
  prompt: string,
  projectElements: Element[]
): BuildGenerationElementsResult {
  let transformedPrompt = prompt;

  const elements: Element[] = [];

  for (const element of projectElements) {
    const mention = `@${element.name}`;

    if (!transformedPrompt.includes(mention)) {
      continue;
    }

    elements.push(element);

    const placeholder = `<<<element_${elements.length}>>>`;

    transformedPrompt = transformedPrompt
      .split(mention)
      .join(placeholder);
  }

  return {
    prompt: transformedPrompt,
    elements,
  };
}