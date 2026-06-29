"use client";

import { RefObject } from "react";
import { Music, Video, X } from "lucide-react";

import { useUploadStore } from "@/store/uploadStore";
import { useGenerationStore } from "@/store/generationStore";

interface UploadPreviewProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function UploadPreview({
  textareaRef,
}: UploadPreviewProps) {
  const files = useUploadStore((state) => state.files);

  const removeFile = useUploadStore((state) => state.removeFile);

  const startFrameAlias = useUploadStore(
    (state) => state.startFrameAlias
  );

  const endFrameAlias = useUploadStore(
    (state) => state.endFrameAlias
  );

  const setStartFrame = useUploadStore(
    (state) => state.setStartFrame
  );

  const setEndFrame = useUploadStore(
    (state) => state.setEndFrame
  );

  const prompt = useGenerationStore((state) => state.prompt);
  const setPrompt = useGenerationStore((state) => state.setPrompt);

  function insertAlias(alias: string) {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = prompt.slice(0, start);
    const after = prompt.slice(end);

    const needSpaceBefore =
      before.length > 0 && !/\s$/.test(before);

    const needSpaceAfter =
      after.length > 0 && !/^\s/.test(after);

    const insert =
      `${needSpaceBefore ? " " : ""}${alias}${
        needSpaceAfter ? " " : ""
      }`;

    const newPrompt = before + insert + after;

    setPrompt(newPrompt);

    requestAnimationFrame(() => {
      const position = before.length + insert.length;

      textarea.focus();
      textarea.setSelectionRange(position, position);
    });
  }

  if (files.length === 0) return null;

  return (
    <div
      style={{
        borderBottom: "1px solid #27272a",
        padding: "0 16px 12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
        }}
      >
        {files.map((file) => {
          const isStart = startFrameAlias === file.alias;
          const isEnd = endFrameAlias === file.alias;

          return (
            <div
              key={file.id}
              style={{
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* IMAGE */}
              {file.type === "image" && (
                <div
                  style={{
                    width: 64,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                    }}
                  >
                    <div
                      onClick={() => insertAlias(file.alias)}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                        overflow: "hidden",
                        border:
                          isStart || isEnd
                            ? "2px solid #7c3aed"
                            : "1px solid #3f3f46",
                        background: "#18181b",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={file.preview}
                        alt=""
                        draggable={false}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          userSelect: "none",
                        }}
                      />
                    </div>

                    {files.length === 2 && (
                      <>
                        {/* START */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStartFrame(file.alias);
                          }}
                          style={{
                            position: "absolute",
                            left: 4,
                            bottom: 4,
                            width: 18,
                            height: 18,
                            borderRadius: 6,
                            border: "none",
                            background: isStart
                              ? "#7c3aed"
                              : "rgba(0,0,0,.7)",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Первый кадр"
                        >
                          ◀
                        </button>

                        {/* END */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEndFrame(file.alias);
                          }}
                          style={{
                            position: "absolute",
                            right: 4,
                            bottom: 4,
                            width: 18,
                            height: 18,
                            borderRadius: 6,
                            border: "none",
                            background: isEnd
                              ? "#7c3aed"
                              : "rgba(0,0,0,.7)",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Последний кадр"
                        >
                          ▶
                        </button>
                      </>
                    )}
                  </div>

                  {files.length === 2 && (
                    <div
                      style={{
                        height: 18,
                        marginTop: 4,
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#8b5cf6",
                      }}
                    >
                      {isStart && "Первый"}
                      {isEnd && "Последний"}
                    </div>
                  )}
                </div>
              )}

              {/* VIDEO */}
              {file.type === "video" && (
                <div
                  onClick={() => insertAlias(file.alias)}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    border: "1px solid #3f3f46",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#18181b",
                    cursor: "pointer",
                  }}
                >
                  <Video size={18} />
                </div>
              )}

              {/* AUDIO */}
              {file.type === "audio" && (
                <div
                  onClick={() => insertAlias(file.alias)}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 12,
                    border: "1px solid #3f3f46",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#18181b",
                    cursor: "pointer",
                  }}
                >
                  <Music size={18} />
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.id);
                }}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#000",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 100,
                  padding: 0,
                  boxShadow: "none",
                }}
              >
                <X size={12} strokeWidth={3.2} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}