"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.detail ?? "Неверный пароль"
        );
      }

      router.replace("/");
      router.refresh();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Ошибка"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          AI Studio
        </h1>

        <p className="mb-8 text-center text-muted-foreground">
          Введите пароль
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
          placeholder="Пароль"
          className="mb-4 h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary"
        />

        {error && (
          <div className="mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={login}
          disabled={loading}
          className="h-12 w-full rounded-xl bg-primary font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </div>
    </div>
  );
}