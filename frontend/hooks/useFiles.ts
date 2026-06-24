"use client";

import { useQuery } from "@tanstack/react-query";

import { getFiles } from "@/services/fileService";

export function useFiles(
  projectId: number | undefined,
  section: string
) {
  return useQuery({
    queryKey: ["files", projectId, section],

    queryFn: () => getFiles(projectId!, section),

    enabled: !!projectId,
  });
}