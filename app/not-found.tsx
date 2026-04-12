"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
      <p className="text-[6rem] font-bold text-muted-foreground leading-none">
        404
      </p>
      <h1 className="text-xl font-semibold">Страница не найдена</h1>
      <p className="text-muted-foreground">Такой страницы не существует.</p>
      <button
        onClick={() => router.push("/applications")}
        className="px-4 py-2 bg-[#f96800] text-white rounded-lg font-medium hover:bg-[#e05a00] transition-colors"
      >
        На главную
      </button>
    </div>
  );
}
