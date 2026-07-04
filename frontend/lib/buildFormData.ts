import { buildGenerationPayload } from "./buildGenerationPayload";
import { buildReferences } from "./buildReferences";

export function buildFormData() {
  const payload = buildGenerationPayload();

  const formData = new FormData();

  formData.append("provider", payload.provider);
  formData.append("model", payload.model);

  formData.append("prompt", payload.prompt);

  formData.append("resolution", payload.resolution);
  formData.append("aspectRatio", payload.aspectRatio);
  formData.append("duration", String(payload.duration));
  formData.append("mode", payload.mode);
  formData.append("audio", String(payload.audio));

  if (payload.projectId !== null) {
    formData.append(
      "projectId",
      String(payload.projectId)
    );
  }

  // Keyframes
  if (payload.startFrameAlias) {
    formData.append(
      "startFrameAlias",
      payload.startFrameAlias
    );
  }

  if (payload.endFrameAlias) {
    formData.append(
      "endFrameAlias",
      payload.endFrameAlias
    );
  }

  // --------------------------------------------------
  // Собираем все изображения для отправки
  // --------------------------------------------------

  const references = buildReferences(
    payload.prompt,
    payload.files
  );

  // Добавляем изображения, выбранные как Keyframes,
  // даже если они отсутствуют в тексте промпта.
  [payload.startFrameAlias, payload.endFrameAlias]
    .filter(
      (alias): alias is string => Boolean(alias)
    )
    .forEach((alias) => {
      if (!references.some((r) => r.alias === alias)) {
        const file = payload.files.find(
          (f) => f.alias === alias
        );

        if (file) {
          references.push({
            alias,
            file,
          });
        }
      }
    });

  // Отправляем все необходимые изображения
  references.forEach((reference) => {
    formData.append("files", reference.file.file);
    formData.append("aliases", reference.alias);
  });

  return formData;
}