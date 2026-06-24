import { api } from "./api";

export interface ProjectFile {
  name: string;
}

export async function getFiles(
  projectId: number,
  section: string
): Promise<ProjectFile[]> {
  const { data } = await api.get(
    `/projects/${projectId}/files/${section}`
  );

  return data;
}