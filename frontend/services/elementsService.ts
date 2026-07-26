import { api } from "./api";

import { Element } from "@/types/element";

interface ElementResponse {
  id: string;
  name: string;
  description: string;

  // URL для UI
  main_reference: string | null;
  references: string[];

  // Имена файлов для backend
  main_reference_file: string | null;
  reference_files: string[];
}

function mapElement(
  element: ElementResponse
): Element {
  return {
    id: element.id,
    name: element.name,
    description: element.description,

    // URL для UI
    mainReference:
      element.main_reference,
    references:
      element.references,

    // Имена файлов для backend
    mainReferenceFile:
      element.main_reference_file,
    referenceFiles:
      element.reference_files,
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