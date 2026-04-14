"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppTheme } from "@/app/components/layout/ThemeContext";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { isDark, toggleTheme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : "";
  const dayStr = now
    ? now.toLocaleDateString("ru-RU", { weekday: "long" })
    : "";
  const dateStr = now
    ? now.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
    : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/applications");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex w-[60%] shrink-0 relative overflow-hidden items-start justify-center">
        <img
          src="/login-bg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
        {now && (
          <div className="relative z-10 flex flex-col items-center select-none mt-10">
            <span className="text-[96px] font-thin leading-none tracking-tight text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.3)]">
              {timeStr}
            </span>
            <span className="mt-3 text-xl font-medium text-muted-foreground capitalize drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
              {dayStr}, {dateStr}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-8 bg-background overflow-y-auto relative">
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute top-4 right-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Сменить тему"
        >
          {isDark ? (
            <Sun className="size-6 text-yellow-400" />
          ) : (
            <Moon className="size-6" />
          )}
          <div
            className={cn(
              "relative inline-flex h-6 w-9.5 shrink-0 items-center rounded-full transition-colors",
              isDark ? "bg-[#f96800]" : "bg-zinc-400",
            )}
          >
            <span
              className={cn(
                "inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform",
                isDark ? "translate-x-[18px]" : "translate-x-0.5",
              )}
            />
          </div>
        </button>

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
            Введите данные для входа в ИССК
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Почта</Label>
              <Input
                type="email"
                required
                placeholder="example@jusanmobile.kz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Пароль</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-1 py-2.5 h-auto bg-[#f96800] text-white font-semibold hover:bg-[#e05a00]"
            >
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
