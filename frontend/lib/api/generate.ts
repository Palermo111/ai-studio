export async function generateVideo(formData: FormData) {
  const response = await fetch(
    "http://localhost:8000/generate",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Неизвестная ошибка";

    try {
      const error = await response.json();

      message = error.detail ?? message;
    } catch {
      // ничего не делаем
    }

    throw new Error(message);
  }

  return response.json();
}

export async function deleteVideo(
  filename: string,
  projectId?: number
) {
  const params = new URLSearchParams({
    filename,
  });

  if (projectId !== undefined) {
    params.append(
      "projectId",
      String(projectId)
    );
  }

  const response = await fetch(
    `http://localhost:8000/generate/video?${params.toString()}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось удалить видео");
  }

  return response.json();
}