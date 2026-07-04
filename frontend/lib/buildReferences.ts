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

  // ---------------------------------------
  // Image-to-Video
  //
  // Если нет ни одного @image,
  // но загружена ровно одна картинка —
  // считаем это Image-to-Video.
  // ---------------------------------------

  if (aliases.length === 0 && files.length === 1) {
    return [
      {
        alias: files[0].alias,
        file: files[0],
      },
    ];
  }

  // ---------------------------------------
  // Reference Images
  // ---------------------------------------

  return aliases
    .map((alias) => {
      const file = files.find(
        (f) => f.alias === alias
      );

      if (!file) {
        console.warn(
          `Reference not found: ${alias}`
        );
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
      ): reference is PromptReference =>
        reference !== null
    );
}