"use client";

import { useMemo, useState } from "react";
import {
  Clock3,
  Download,
  Monitor,
  Star,
  Trash2,
  Volume2,
} from "lucide-react";

import { useWorkspaceStore } from "@/store/workspaceStore";
import DeleteProjectDialog from "@/components/dialogs/DeleteProjectDialog";
import { deleteVideo } from "@/lib/api/generate";
import { useProjectStore } from "@/store/projectStore";

export default function GeneratedVideoCard() {
  const { video, reset } = useWorkspaceStore();
  const activeProject = useProjectStore(
  (state) => state.activeProject
);

  const [isVertical, setIsVertical] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!video) {
    return null;
  }

  const fileName = useMemo(() => {
    try {
      return decodeURIComponent(
        video.path.split("/").pop() ?? "video.mp4"
      );
    } catch {
      return "video.mp4";
    }
  }, [video.path]);

  function handleLoadedMetadata(
    event: React.SyntheticEvent<HTMLVideoElement>
  ) {
    const element = event.currentTarget;

    setIsVertical(
      element.videoHeight > element.videoWidth
    );
  }

async function handleDownload() {
  if (!video) return;

  try {
    // Современные браузеры (Chrome, Edge)
    if ("showSaveFilePicker" in window) {
      const response = await fetch(video.path);

      if (!response.ok) {
        throw new Error("Не удалось скачать видео");
      }

      const blob = await response.blob();

      // @ts-ignore
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "MP4 Video",
            accept: {
              "video/mp4": [".mp4"],
            },
          },
        ],
      });

      const writable = await handle.createWritable();

      await writable.write(blob);
      await writable.close();

      return;
    }

    const link = document.createElement("a");

    link.href = video.path;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  } catch (error) {
    console.error(error);
  }
}

  return (
  <>
    

        <div
        className={`
            rounded-[30px]
            border
            border-[#E8C8A5]
            bg-white
            shadow-[0_6px_18px_rgba(0,0,0,0.05)]
            transition-all
            duration-300

            ${
            isVertical
                ? "w-[500px]"
                : "w-[960px]"
            }
        `}
        >

        <div className="p-8">

            <video
            controls
            autoPlay
            src={video.path}
            onLoadedMetadata={handleLoadedMetadata}
            className={`
                block
                w-full
                max-h-[640px]
                object-contain
                rounded-[22px]
            `}
            />

        </div>

        <div className="px-10 pb-10">

          <div className="flex justify-center">

            <h2
              className="
                truncate
                text-center
                text-[20px]
                font-semibold
                text-foreground
              "
            >
              {fileName}
            </h2>

          </div>

          <div
            className="
              mt-11
              flex
              flex-wrap
              items-center
              justify-center
              gap-5
              text-[15px]
              text-muted-foreground
            "
          >

            <div className="flex items-center gap-2">
              <Monitor size={18} />
              <span>{video.resolution}</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              <span>{video.duration} сек</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>{video.mode}</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-2">
              <Volume2 size={18} />
              <span>
                {video.audio
                  ? "Звук"
                  : "Без звука"}
              </span>
            </div>

          </div>

          <div
            className="
              mt-8
              border-t
              border-border
              pt-8
            "
          >

            <div className="flex gap-5">

            <button
            onClick={handleDownload}
            className="
                flex-1
                flex
                h-14
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#C9823B]
                text-lg
                font-medium
                text-white
                transition-all
                duration-200
                hover:brightness-105
                active:scale-[0.98]
            "
            >
                <Download size={22} />
                Скачать
            </button>

            <button
            onClick={() => setDeleteOpen(true)}
            className="
                flex-1
                flex
                h-14
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-border
                bg-white
                text-lg
                font-medium
                text-foreground
                transition-all
                duration-200
                hover:bg-muted
                active:scale-[0.98]
            "
            >
                <Trash2 size={22} />
                Удалить
              </button>

            </div>

          </div>

        </div>

      </div>

      <DeleteProjectDialog
        open={deleteOpen}
        title="Удалить видео"
        itemType="видео"
        itemName={fileName}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={async () => {
            await handleDelete();
            setDeleteOpen(false);
        }}
        />
    </>     
  );
}