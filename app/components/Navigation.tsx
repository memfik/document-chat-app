"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAppTheme } from "./ThemeContext";

const navItems = [
  { label: "Заявки", href: "/applications" },
  { label: "ЗНО", href: "/zno" },
  { label: "Сопровождение", href: "/accompaniment" },
];

const docDropdownItems = [
  { label: "Инструкция", href: "https://contract.jusanmobile.kz/manual.pdf" },
  {
    label: "Инструкция рамочная",
    href: "https://contract.jusanmobile.kz/manual_ex1.pdf",
  },
  {
    label: "Рекомендации",
    href: "https://contract.jusanmobile.kz/recomend.pdf",
  },
];

const notifications = [
  { id: 1, text: "Заявка №1023 требует проверки", time: "5 мин назад" },
  { id: 2, text: "Документ загружен успешно", time: "1 час назад" },
  { id: 3, text: "Новый комментарий в заявке №987", time: "2 часа назад" },
  { id: 4, text: "Срок по заявке №1010 истекает", time: "вчера" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [showImportModal, setShowImportModal] = useState(false);
  const [docsAnchorEl, setDocsAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{ bgcolor: "background.paper" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3, minHeight: 64 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => router.push("/applications/new")}
              disableElevation
              sx={
                pathname === "/applications/new"
                  ? {
                      bgcolor: "#0759e8",
                      color: "#fff",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#0042b5" },
                    }
                  : {
                      bgcolor: "#88bdfc",
                      color: "#000",
                      "&:hover": { bgcolor: "#7aabe6" },
                    }
              }
            >
              Новая Ф16
            </Button>

            <Button
              variant="contained"
              size="small"
              startIcon={<FileUploadIcon />}
              onClick={() => setShowImportModal(true)}
              disableElevation
              sx={{
                bgcolor: "#89fab1",
                color: "#000",
                "&:hover": { bgcolor: "#62fc98" },
              }}
            >
              Импорт
            </Button>

            <Button
              variant="contained"
              size="small"
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    transform: docsAnchorEl ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              }
              onClick={(e) => setDocsAnchorEl(e.currentTarget)}
              disableElevation
              color="inherit"
              sx={{ bgcolor: "action.hover" }}
            >
              Инструкции
            </Button>
            <Menu
              anchorEl={docsAnchorEl}
              open={Boolean(docsAnchorEl)}
              onClose={() => setDocsAnchorEl(null)}
            >
              {docDropdownItems.map((item) => (
                <MenuItem
                  key={item.href}
                  onClick={() => {
                    window.open(item.href, "_blank");
                    setDocsAnchorEl(null);
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

            <Button
              variant="contained"
              size="small"
              onClick={() => router.push("/rd")}
              disableElevation
              sx={
                pathname === "/rd"
                  ? {
                      bgcolor: "#0759e8",
                      color: "#fff",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#0042b5" },
                    }
                  : {
                      bgcolor: "#88bdfc",
                      color: "#000",
                      "&:hover": { bgcolor: "#7aabe6" },
                    }
              }
            >
              РД
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={() => router.push("/report")}
              disableElevation
              sx={
                pathname === "/report"
                  ? {
                      bgcolor: "#ff2929",
                      color: "#fff",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#ed1111" },
                    }
                  : {
                      bgcolor: "#fa6969",
                      color: "#000",
                      "&:hover": { bgcolor: "#ff4f4f" },
                    }
              }
            >
              REPORT
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  size="small"
                  sx={
                    active
                      ? {
                          bgcolor: "#f96800",
                          color: "#fff",
                          fontWeight: 700,
                          px: 2.5,
                          "&:hover": { bgcolor: "#e05a00" },
                        }
                      : {
                          color: "text.secondary",
                          px: 2.5,
                          "&:hover": { bgcolor: "action.hover" },
                        }
                  }
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              onClick={toggleTheme}
              title={isDark ? "Светлая тема" : "Тёмная тема"}
            >
              {isDark ? (
                <LightModeIcon sx={{ color: "#facc15" }} />
              ) : (
                <DarkModeIcon color="action" />
              )}
            </IconButton>

            <IconButton onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notifAnchorEl}
              open={Boolean(notifAnchorEl)}
              onClose={() => setNotifAnchorEl(null)}
              PaperProps={{ sx: { width: 320 } }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Уведомления
                </Typography>
              </Box>
              {notifications.length === 0 ? (
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    У вас нет уведомлений
                  </Typography>
                </MenuItem>
              ) : (
                notifications.map((n) => (
                  <MenuItem
                    key={n.id}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      py: 1.5,
                      borderBottom: 1,
                      borderColor: "divider",
                      "&:last-child": { borderBottom: 0 },
                    }}
                  >
                    <Typography variant="body2">{n.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {n.time}
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Menu>

            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ mx: 0.5, color: "text.primary" }}
            >
              Югай Виталий
            </Typography>

            <IconButton title="Выйти" onClick={() => router.push("/login")}>
              <LogoutIcon color="action" fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Импорт файлов</DialogTitle>
        <DialogContent>
          <Box
            component="label"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 2,
              height: 128,
              cursor: "pointer",
              "&:hover": { borderColor: "#f96800" },
              transition: "border-color 0.2s",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Нажмите или перетащите файл
            </Typography>
            <input type="file" hidden multiple />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowImportModal(false)} color="inherit">
            Отмена
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ bgcolor: "#f96800", "&:hover": { bgcolor: "#e05a00" } }}
          >
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
