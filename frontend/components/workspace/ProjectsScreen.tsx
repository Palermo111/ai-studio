"use client";

import { useState } from "react";
import { Folder, Plus, MoreVertical } from "lucide-react";

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
import { useWorkspaceStore } from "@/store/workspaceStore";

import RenameProjectDialog from "@/components/dialogs/RenameProjectDialog";
import DeleteProjectDialog from "@/components/dialogs/DeleteProjectDialog";

type Project = {
  id: number;
  name: string;
};

export default function ProjectsScreen() {
  const [projectName, setProjectName] = useState("");

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [targetProject, setTargetProject] = useState<Project | null>(null);

  const { data: projects, isLoading, error } = useProjects();

  const createProject = useCreateProject();
  const renameProject = useRenameProject();
  const deleteProject = useDeleteProject();

  const activeProject = useProjectStore((s) => s.activeProject);
  const setActiveProject = useProjectStore((s) => s.setActiveProject);

  const setSection = useWorkspaceStore((s) => s.setSection);

  async function handleCreate() {
    const name = projectName.trim();
    if (!name) return;

    const project = await createProject.mutateAsync(name);

    setProjectName("");
    setActiveProject(project);
  }

  async function handleDelete() {
    if (!targetProject) return;

    await deleteProject.mutateAsync(targetProject.id);

    if (activeProject?.id === targetProject.id) {
      setActiveProject(null);
      setSection("home");
    }

    setDeleteOpen(false);
    setTargetProject(null);
  }

  async function handleRename(name: string) {
    if (!targetProject) return;

    await renameProject.mutateAsync({
      projectId: targetProject.id,
      name,
    });

    if (activeProject?.id === targetProject.id) {
      setActiveProject({
        ...activeProject,
        name,
      });
    }

    setRenameOpen(false);
    setTargetProject(null);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Проекты
      </h1>

      {/* CREATE */}
      <div className="flex gap-2 mb-8">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Название проекта..."
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2"
        />

        <button
          onClick={handleCreate}
          className="rounded-xl bg-primary px-4 py-2 text-primary-foreground"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* LOADING */}
      {isLoading && (
        <p className="text-muted-foreground">
          Загрузка проектов...
        </p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-red-500">
          Ошибка загрузки проектов
        </p>
      )}

      {/* LIST */}
      <div className="space-y-2">
        {projects?.map((project: Project) => {
          const isActive = activeProject?.id === project.id;

          return (
            <div
              key={project.id}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                isActive
                  ? "border-primary bg-background"
                  : "border-border hover:bg-muted/50"
              }`}
            >

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  setActiveProject(project);
                  setSection("home");
                }}
              >
                <Folder size={18} />
                {project.name}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <MoreVertical size={18} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setTargetProject(project);
                      setRenameOpen(true);
                    }}
                  >
                    Переименовать
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      setTargetProject(project);
                      setDeleteOpen(true);
                    }}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          );
        })}
      </div>

      {/* DIALOGS */}
      <RenameProjectDialog
        open={renameOpen}
        currentName={targetProject?.name ?? ""}
        onCancel={() => setRenameOpen(false)}
        onSave={handleRename}
      />

      <DeleteProjectDialog
        open={deleteOpen}
        title="Удалить проект"
        itemType="проект"
        itemName={targetProject?.name ?? ""}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
}