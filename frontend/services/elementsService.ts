import { api } from "./api";

import { Element } from "@/types/element";

interface ElementResponse {
  id: string;
  name: string;
  description: string;
  main_reference: string | null;
  references: string[];
}

function mapElement(
  element: ElementResponse
): Element {
  return {
    id: element.id,
    name: element.name,
    description: element.description,
    mainReference:
      element.main_reference,
    references: element.references,
  };
}

export async function getElements(
  projectId: number
): Promise<Element[]> {
  const { data } = await api.get<
    ElementResponse[]
  >(
    `/projects/${projectId}/elements`
  );

  return data.map(mapElement);
}

export async function createElement(
  projectId: number,
  formData: FormData
): Promise<Element> {
  const { data } = await api.post<
    ElementResponse
  >(
    `/projects/${projectId}/elements`,
    formData
  );

  return mapElement(data);
}

export async function updateElement(
  projectId: number,
  elementId: string,
  formData: FormData
): Promise<Element> {
  const { data } = await api.put<
    ElementResponse
  >(
    `/projects/${projectId}/elements/${elementId}`,
    formData
  );

  return mapElement(data);
}

export async function deleteElement(
  projectId: number,
  elementId: string
): Promise<void> {
  await api.delete(
    `/projects/${projectId}/elements/${elementId}`
  );
}