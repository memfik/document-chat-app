"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  Switch,
} from "@mui/material";
import { useAppTheme } from "./ThemeContext";

const notifications = [
  { id: 1, text: "Заявка №1023 требует проверки", time: "5 мин назад" },
  { id: 2, text: "Документ загружен успешно", time: "1 час назад" },
  { id: 3, text: "Новый комментарий в заявке №987", time: "2 часа назад" },
  { id: 4, text: "Срок по заявке №1010 истекает", time: "вчера" },
];

export function Navigation() {
  const router = useRouter();
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2, minHeight: 56 }}>
        <img
          src="/logo-jusanmobile.png"
          alt="Logo"
          className="object-contain h-12 ml-3"
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
            <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
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
          <Box
            onClick={(e) => setUserAnchorEl(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              px: 1,
              py: 0.5,
              ml: 1,
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <AccountCircleIcon color="action" fontSize="small" />
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ color: "text.primary" }}
            >
              Югай Виталий
            </Typography>
            <KeyboardArrowDownIcon
              fontSize="small"
              color="action"
              sx={{
                transform: userAnchorEl ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </Box>
          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={() => setUserAnchorEl(null)}
            PaperProps={{ sx: { width: 220 } }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={toggleTheme}
              sx={{ justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  {isDark ? (
                    <LightModeIcon fontSize="small" sx={{ color: "#facc15" }} />
                  ) : (
                    <DarkModeIcon fontSize="small" color="action" />
                  )}
                </ListItemIcon>
                <Typography variant="body2">
                  {isDark ? "Светлая тема" : "Тёмная тема"}
                </Typography>
              </Box>
              <Switch
                size="small"
                checked={isDark}
                onChange={toggleTheme}
                onClick={(e) => e.stopPropagation()}
              />
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setUserAnchorEl(null);
                router.push("/login");
              }}
              sx={{ color: "error.main" }}
            >
              <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2">Выйти</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
