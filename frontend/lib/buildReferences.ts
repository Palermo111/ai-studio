import { UploadedFile } from "@/store/uploadStore";

export interface PromptReference {
  alias: string;
  file: UploadedFile;
}

export function buildReferences(
  prompt: string,
  files: UploadedFile[]
): PromptReference[] {
  // Ищем все теги вида @image1, @video2, @audio3
  const matches =
    prompt.match(/@(image|video|audio)\d+/g) ?? [];

  // Убираем дубликаты
  const aliases = [...new Set(matches)];

  // Находим соответствующие файлы
  return aliases
    .map((alias) => {
      const file = files.find((f) => f.alias === alias);

      if (!file) {
        console.warn(`Reference not found: ${alias}`);
        return null;
      }

      return {
        alias,
        file,
      };
    })
    .filter(
      (
        reference
      ): reference is PromptReference => reference !== null
    );
}