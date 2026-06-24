import AppLayout from "@/components/layout/AppLayout";

import Sidebar from "@/components/sidebar/Sidebar";
import Workspace from "@/components/workspace/Workspace";

export default function HomePage() {
  return (
    <AppLayout
      left={<Sidebar />}

      center={<Workspace />}

      right={
        <div className="p-5">

          <h2 className="mb-6 text-lg font-semibold">
            Настройки
          </h2>

          <div className="space-y-5">

            <div className="rounded-xl bg-zinc-900 p-4">
              Provider
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              Model
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              Resolution
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              Duration
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              Aspect Ratio
            </div>

          </div>

        </div>
      }

      bottom={
        <div className="p-5">

          <div className="flex gap-3">

            <input
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none"
              placeholder="Введите промпт..."
            />

            <button className="rounded-xl bg-blue-600 px-8 hover:bg-blue-500">
              Generate
            </button>

          </div>

        </div>
      }
    />
  );
}