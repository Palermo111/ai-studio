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