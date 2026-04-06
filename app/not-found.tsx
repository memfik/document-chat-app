"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="text-xl font-semibold text-gray-700">
        Страница не найдена
      </h2>
      <p className="text-gray-400">Такой страницы не существует.</p>
      <button
        onClick={() => router.push("/applications")}
        className="mt-2 px-6 py-2 bg-[#f96800] text-white rounded-lg text-sm font-medium hover:bg-[#e05a00] transition-colors"
      >
        На главную
      </button>
    </div>
  );
}
