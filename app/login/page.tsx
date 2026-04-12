"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="flex h-screen overflow-hidden">
      {/* Background image (desktop only) */}
      <div className="hidden md:block w-[60%] shrink-0 relative overflow-hidden">
        <img
          src="/login-bg.png"
          alt="Background"
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-8 bg-background overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <img
              src="/logo-jusanmobile.png"
              alt="Logo"
              className="h-12 object-contain"
            />
          </div>

          <h1 className="text-xl font-bold text-center mb-1">
            Добро пожаловать
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Введите данные для входа в систему
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Почта</label>
              <input
                type="email"
                required
                placeholder="example@jusanmobile.kz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-base focus:ring-[#f96800]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base pr-10 focus:ring-[#f96800]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-1 bg-[#f96800] text-white font-semibold rounded-lg hover:bg-[#e05a00] transition-colors text-sm"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
