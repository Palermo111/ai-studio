import { api } from "./api";

import { Element } from "@/types/element";

export async function getElements(
  projectId: number
): Promise<Element[]> {
  const { data } = await api.get(
    `/projects/${projectId}/elements`
  );

  return data;
}

export async function createElement(
  projectId: number,
  formData: FormData
): Promise<Element> {
  const { data } = await api.post(
    `/projects/${projectId}/elements`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
}

export async function updateElement(
  projectId: number,
  elementId: string,
  formData: FormData
): Promise<Element> {
  const { data } = await api.put(
    `/projects/${projectId}/elements/${elementId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
}

export async function deleteElement(
  projectId: number,
  elementId: string
): Promise<void> {
  await api.delete(
    `/projects/${projectId}/elements/${elementId}`
  );
}