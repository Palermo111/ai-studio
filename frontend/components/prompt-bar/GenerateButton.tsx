"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { useGenerationStore } from "@/store/generationStore";
import { useUploadStore } from "@/store/uploadStore";

import { calculateGenerationPrice } from "@/lib/cost/calculateCost";
import { getUsdRate } from "@/lib/cost/getUsdRate";

import { buildFormData } from "@/lib/buildFormData";
import { generateVideo } from "@/lib/api/generate";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "";

/**
 * true  -> показываем тестовое видео
 * false -> настоящая генерация через backend
 */
const DEV_MODE = true;

const DEV_VIDEO =
  `${API_URL}/storage/videos/seedance_20260703_112114.mp4`;

export default function GenerateButton() {
  const status = useWorkspaceStore((state) => state.status);
  const setStatus = useWorkspaceStore((state) => state.setStatus);
  const setVideo = useWorkspaceStore((state) => state.setVideo);
  const setError = useWorkspaceStore((state) => state.setError);

  const prompt = useGenerationStore((state) => state.prompt);
  const model = useGenerationStore((state) => state.model);
  const resolution = useGenerationStore(
    (state) => state.resolution
  );
  const duration = useGenerationStore(
    (state) => state.duration
  );
  const audio = useGenerationStore(
    (state) => state.audio
  );
  const mode = useGenerationStore(
    (state) => state.mode
  );

  const clearFiles = useUploadStore(
    (state) => state.clearFiles
  );

  const [usdRate, setUsdRate] = useState(75);

  useEffect(() => {
    getUsdRate().then(setUsdRate);
  }, []);

  const cost = calculateGenerationPrice(
    model,
    resolution,
    duration,
    audio,
    usdRate
  );

  const isDisabled =
    status === "generating" || !prompt.trim();

  async function handleGenerate() {
    console.log("DEV_MODE =", DEV_MODE);
    if (isDisabled) return;

    try {
      setError(null);
      setVideo(null);
      setStatus("generating");

      /**
       * DEV MODE
       */

      if (DEV_MODE) {
        console.log("TEST VIDEO");
        setVideo({
          path: DEV_VIDEO,
          resolution,
          duration,
          mode,
          audio,
        });

        setStatus("success");
        return;
      }

      /**
       * REAL GENERATION
       */

      const formData = buildFormData();

      const result = await generateVideo(formData);

      setVideo({
        path: result.video_path,
        resolution,
        duration,
        mode,
        audio,
      });

      clearFiles();

      setStatus("success");
    } catch (error) {
      setStatus("error");

      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-4">
      <div className="text-right leading-tight">
        <div className="text-xs text-muted-foreground">
          Стоимость
        </div>

        <div className="text-sm font-semibold text-foreground">
          ≈ {cost} ₽
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isDisabled}
        className="
          group
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-primary
          text-primary-foreground
          shadow-sm
          transition-all
          duration-200
          hover:scale-105
          hover:shadow-lg
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:scale-100
        "
      >
        {status === "generating" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
        ) : (
          <ArrowUp
            size={20}
            strokeWidth={2.5}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </div>
  );
}