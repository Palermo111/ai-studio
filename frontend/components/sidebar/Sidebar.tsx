"use client";

import RenameProjectDialog from "@/components/dialogs/RenameProjectDialog";
import DeleteProjectDialog from "@/components/dialogs/DeleteProjectDialog";

import { useEffect, useState } from "react";
import { Folder, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useProjects,
  useCreateProject,
  useRenameProject,
  useDeleteProject,
} from "@/hooks/useProjects";
import { useProjectStore } from "@/store/projectStore";

export default function Sidebar() {
  const [projectName, setProjectName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] =
    useState(false);

  const [projectToRename, setProjectToRename] =
    useState<{
      id: number;
      name: string;
    } | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
  useState(false);

  const [projectToDelete, setProjectToDelete] =
    useState<{
      id: number;
      name: string;
    } | null>(null);

  const { data: projects, isLoading, error } = useProjects();

  const createProject = useCreateProject();
  const renameProject = useRenameProject();
  const deleteProject = useDeleteProject();

  const activeProject = useProjectStore((state) => state.activeProject);
  const setActiveProject = useProjectStore((state) => state.setActiveProject);

  // При загрузке списка устанавливаем первый проект активным (если не задан)
  useEffect(() => {
    if (!activeProject && projects && projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject, setActiveProject]);

  // Создать новый проект
  async function handleCreateProject() {
    const name = projectName.trim();
    if (!name) return;
    const project = await createProject.mutateAsync(name);
    setProjectName("");
    setActiveProject(project);
  }

  // Удалить проект (с запросом подтверждения)
  async function handleDeleteProject() {
    if (!projectToDelete) return;

    await deleteProject.mutateAsync(projectToDelete.id);

    if (
      activeProject &&
      activeProject.id === projectToDelete.id
    ) {
      const nextProject = projects?.find(
        (project) => project.id !== projectToDelete.id
      );

      setActiveProject(nextProject ?? null);
    }

    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  }

  async function handleRenameProject(
    newName: string
  ) {
    if (!projectToRename) return;

    const name = newName.trim();

    if (!name) return;

    await renameProject.mutateAsync({
      projectId: projectToRename.id,
      name,
    });

    if (
      activeProject &&
      activeProject.id === projectToRename.id
    ) {
      setActiveProject({
        ...activeProject,
        name,
      });
    }

    setRenameDialogOpen(false);
    setProjectToRename(null);
  }

  return (
    <>
      <RenameProjectDialog
        open={renameDialogOpen}
        currentName={projectToRename?.name ?? ""}
        onCancel={() => {
          setRenameDialogOpen(false);
          setProjectToRename(null);
        }}
        onSave={handleRenameProject}
      />
      <DeleteProjectDialog
        open={deleteDialogOpen}
        projectName={projectToDelete?.name ?? ""}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDeleteProject}
      />
    
      <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800 p-5">
        <h2 className="mb-4 text-lg font-semibold">Проекты</h2>
        <input
          type="text"
          placeholder="Название проекта..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mb-3 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 outline-none focus:border-violet-500"
        />
        <button
          onClick={handleCreateProject}
          className="w-full rounded-lg bg-violet-600 py-2 font-medium transition hover:bg-violet-500"
        >
          Создать проект
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading && <p className="text-sm text-zinc-500">Загрузка проектов...</p>}
        {error && <p className="text-sm text-red-500">Не удалось загрузить проекты</p>}
        {projects?.map((project) => {
          const isActive = activeProject?.id === project.id;
          return (
            <div
              key={project.id}
              className={`mb-2 flex items-center rounded-lg transition ${
                isActive ? "bg-violet-600 text-white" : "hover:bg-zinc-900"
              }`}
            >
              <button
                onClick={() => setActiveProject(project)}
                className="flex flex-1 items-center gap-3 px-3 py-3 text-left"
              >
                <Folder size={18} />

                <span className="truncate">
                  {project.name}
                </span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="mr-2 rounded p-1 hover:bg-black/20">
                    <MoreVertical size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setProjectToRename({
                        id: project.id,
                        name: project.name,
                      });

                      setRenameDialogOpen(true);
                    }}
                  >
                    Переименовать
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setProjectToDelete({
                        id: project.id,
                        name: project.name,
                      });

                      setDeleteDialogOpen(true);
                    }}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
        {!isLoading && projects?.length === 0 && (
          <p className="text-sm text-zinc-500">Пока нет ни одного проекта</p>
        )}
      </div>
    </div>
     </>
  );
}
