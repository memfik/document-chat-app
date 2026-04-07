"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/applications");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logo-jusanmobile.png"
            alt="Logo"
            className="object-contain h-16"
          />
          <span className="text-md font-bold text-gray-800 text-center leading-tight">
            Служба сопровождения контрактов
          </span>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Почта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@jusanmobile.kz"
              required
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2.5 bg-black text-white text-sm font-semibold rounded-lg"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
