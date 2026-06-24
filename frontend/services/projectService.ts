import { api } from "./api";
import { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get("/projects");

  return data;
}

export async function createProject(name: string) {
  const { data } = await api.post("/projects", {
    name,
  });

  return data;
}

export async function renameProject(
  projectId: number,
  name: string
) {
  const { data } = await api.patch(
    `/projects/${projectId}`,
    {
      name,
    }
  );

  return data;
}

export async function deleteProject(projectId: number) {
  const { data } = await api.delete(
    `/projects/${projectId}`
  );

  return data;
}