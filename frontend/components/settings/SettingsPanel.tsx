"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPanel() {
  return (
    <aside className="w-[360px] border-l border-zinc-800 bg-zinc-950">
      <Card className="m-4 border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Параметры генерации</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Provider */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Provider
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

          {/* Model */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Model
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

          {/* Resolution */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Resolution
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

          {/* Aspect */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Aspect Ratio
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

          {/* Duration */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Duration
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

          {/* Audio */}

          <div>
            <p className="mb-2 text-sm font-medium">
              Audio
            </p>

            <div className="h-10 rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>

        </CardContent>
      </Card>
    </aside>
  );
}