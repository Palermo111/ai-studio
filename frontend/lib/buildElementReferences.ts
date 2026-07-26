import { useElementStore } from "@/store/elementStore";

export interface KlingElementReference {
  name: string;
  description: string;
  mainReference: string | null;
  references: string[];
}

export function buildElementReferences(
  prompt: string
): KlingElementReference[] {
  const elements =
    useElementStore.getState().elements;

  const matches =
    prompt.match(/@[^\s@]+/g) ?? [];

  const names = [
    ...new Set(
      matches.map((match) => match.slice(1))
    ),
  ];

  return names
    .map((name) => {
      const element = elements.find(
        (item) => item.name === name
      );

      if (!element) {
        return null;
      }

      return {
        name: element.name,
        description: element.description,
        mainReference:
          element.mainReference,
        references: element.references,
      };
    })
    .filter(
      (
        element
      ): element is KlingElementReference =>
        element !== null
    );
}