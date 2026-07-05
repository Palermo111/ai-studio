const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "";

export async function generateVideo(formData: FormData) {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    let message = "Неизвестная ошибка";

    try {
      const error = await response.json();
      message = error.detail ?? message;
    } catch {}

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
    params.append("projectId", String(projectId));
  }

  const response = await fetch(
    `${API_URL}/generate/video?${params.toString()}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось удалить видео");
  }

  return response.json();
}