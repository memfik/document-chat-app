"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Заявки", href: "/applications" },
  { label: "ЗНО", href: "/zno" },
  { label: "Сопровождение", href: "/accompaniment" },
];

const docDropdownItems = [
  { label: "Инструкция", href: "/documents/1" },
  { label: "Инструкция рамочная", href: "/documents/2" },
  { label: "Рекомендации", href: "/documents/3" },
];

const NOTIFICATION_COUNT = 4;

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDocsDropdown, setShowDocsDropdown] = useState(false);
  const docsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setShowDocsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="h-16 px-6 flex items-center justify-between">
          <span className="text-[#1a1a2e] text-xl font-semibold whitespace-nowrap">
            Служба сопровождения контрактов
          </span>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "px-5 py-1.5 rounded-lg text-sm transition-colors",
                    active
                      ? "bg-[#f96800] text-white font-semibold hover:bg-[#e05a00]"
                      : "text-gray-500 font-normal hover:bg-gray-100",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-3 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <NotificationsIcon className="text-gray-500" fontSize="medium" />
              {NOTIFICATION_COUNT > 0 && (
                <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                  {NOTIFICATION_COUNT}
                </span>
              )}
            </button>
            <span className="text-sm font-medium text-gray-700 mx-1">
              Югай Виталий
            </span>
            <button
              className="p-3 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              title="Выйти"
              onClick={() => {
                router.push("/login");
              }}
            >
              <LogoutIcon className="text-gray-500" fontSize="small" />
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200" />
        <div className="px-6 py-2 flex items-center gap-2">
          <button
            onClick={() => router.push("/applications/new")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer",
              pathname === "/applications/new"
                ? "bg-blue-500 text-white font-semibold"
                : "bg-blue-200 text-gray-600 hover:bg-blue-300",
            )}
          >
            <AddIcon fontSize="small" />
            Новая Ф16
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-1.5 rounded-lg text-sm text-gray-600 bg-green-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileUploadIcon fontSize="small" />
            Импорт
          </button>

          <div ref={docsRef} className="relative">
            <button
              onClick={() => setShowDocsDropdown((v) => !v)}
              className="px-4 py-1.5 rounded-lg text-sm text-gray-600 bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Документы
              <KeyboardArrowDownIcon
                fontSize="small"
                className={cn(
                  "transition-transform",
                  showDocsDropdown ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
            {showDocsDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px] py-1">
                {docDropdownItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setShowDocsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => router.push("/rd")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer",
              pathname === "/rd"
                ? "bg-blue-500 text-white font-semibold"
                : "bg-blue-200 text-gray-600 hover:bg-blue-300",
            )}
          >
            РД
          </button>
          <button
            onClick={() => router.push("/report")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer",
              pathname === "/report"
                ? "bg-red-500 text-white font-semibold"
                : "bg-red-300 text-gray-600 hover:bg-red-400",
            )}
          >
            REPORT
          </button>
        </div>
      </nav>

      {showImportModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowImportModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Импорт файлов
            </h3>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-[#f96800] transition-colors">
              <span className="text-sm text-gray-400">
                Нажмите или перетащите файл
              </span>
              <input type="file" className="hidden" multiple />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button className="px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors">
                Загрузить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
