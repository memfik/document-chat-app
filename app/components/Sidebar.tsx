"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const EXPANDED = 220;
const COLLAPSED = 60;

const navItems = [
  {
    label: "Заявки",
    href: "/applications",
    icon: <ListAltIcon fontSize="small" />,
  },
  { label: "ЗНО", href: "/zno", icon: <AssignmentIcon fontSize="small" /> },
  {
    label: "Сопровождение",
    href: "/accompaniment",
    icon: <HandshakeIcon fontSize="small" />,
  },
  {
    label: "Рамочный договор",
    href: "/rd",
    icon: <FolderOpenIcon fontSize="small" />,
  },
  {
    label: "Отчеты",
    href: "/report",
    icon: <AssessmentIcon fontSize="small" />,
  },
];

const docItems = [
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

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [importOpen, setImportOpen] = useState(false);
  const [docsAnchor, setDocsAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const actionBtn = (
    label: string,
    icon: React.ReactNode,
    onClick: () => void,
    color?: string,
    active?: boolean,
  ) => (
    <Tooltip title={open ? "" : label} placement="right" arrow>
      <Button
        fullWidth
        startIcon={icon}
        onClick={onClick}
        size="small"
        variant={active ? "contained" : "text"}
        sx={{
          justifyContent: open ? "flex-start" : "center",
          minWidth: 0,
          px: open ? 1.5 : 1,
          py: 0.75,
          mb: 0.5,
          borderRadius: 1.5,
          textTransform: "none",
          fontWeight: active ? 600 : 400,
          color: active ? "#fff" : "text.secondary",
          bgcolor: active ? (color ?? "primary.main") : "transparent",
          "&:hover": {
            bgcolor: active ? (color ?? "primary.dark") : "action.hover",
          },
          "& .MuiButton-startIcon": {
            mx: open ? undefined : 0,
          },
        }}
      >
        {open ? label : null}
      </Button>
    </Tooltip>
  );

  const handleNavClick = (href: string) => {
    router.push(href);
    onMobileClose?.();
  };
  const navList = (forceExpanded = false) => {
    const expanded = forceExpanded || open;
    return (
      <List dense disablePadding sx={{ flex: 1, px: 0.75, py: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Tooltip
              key={item.href}
              title={expanded ? "" : item.label}
              placement="right"
              arrow
            >
              <ListItemButton
                selected={active}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.25,
                  px: expanded ? 1.5 : 1,
                  justifyContent: expanded ? "flex-start" : "center",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: expanded ? 32 : "auto",
                    color: active ? "#fff" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        fontWeight: active ? 600 : 400,
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    );
  };
  const actionButtons = (forceExpanded = false) => {
    const expanded = forceExpanded || open;
    return (
      <Box sx={{ px: 0.75, pt: 1, pb: 0.5 }}>
        {actionBtn(
          "Новая Ф16",
          <AddIcon fontSize="small" />,
          () => {
            router.push("/new-application");
            onMobileClose?.();
          },
          "#f96800",
          isActive("/new-application"),
        )}
        {actionBtn("Импорт", <FileUploadIcon fontSize="small" />, () =>
          setImportOpen(true),
        )}
        <Tooltip title={expanded ? "" : "Инструкции"} placement="right" arrow>
          <Button
            fullWidth
            startIcon={<MenuBookIcon fontSize="small" />}
            endIcon={
              expanded ? (
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{
                    transform: docsAnchor ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    ml: "auto",
                  }}
                />
              ) : null
            }
            onClick={(e) => setDocsAnchor(e.currentTarget)}
            size="small"
            sx={{
              justifyContent: expanded ? "flex-start" : "center",
              minWidth: 0,
              px: expanded ? 1.5 : 1,
              py: 0.75,
              borderRadius: 1.5,
              textTransform: "none",
              color: "text.secondary",
              "&:hover": { bgcolor: "action.hover" },
              "& .MuiButton-startIcon": { mx: expanded ? undefined : 0 },
              "& .MuiButton-endIcon": { ml: "auto" },
            }}
          >
            {expanded ? "Инструкции" : null}
          </Button>
        </Tooltip>
        <Menu
          anchorEl={docsAnchor}
          open={Boolean(docsAnchor)}
          onClose={() => setDocsAnchor(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {docItems.map((item) => (
            <MenuItem
              key={item.href}
              onClick={() => {
                window.open(item.href, "_blank");
                setDocsAnchor(null);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const importDialog = (
    <Dialog
      open={importOpen}
      onClose={() => setImportOpen(false)}
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
            transition: "border-color 0.2s",
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Нажмите или перетащите файл
          </Typography>
          <input type="file" hidden multiple />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setImportOpen(false)}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{ textTransform: "none" }}
        >
          Загрузить
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (isMobile) {
    return (
      <>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 0.5,
              py: 0.75,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton size="small" onClick={onMobileClose}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          </Box>
          {actionButtons(true)}
          <Divider />
          {navList(true)}
        </Drawer>
        {importDialog}
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: open ? EXPANDED : COLLAPSED,
          transition: "width 0.22s ease",
          flexShrink: 0,
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "flex-end" : "center",
            px: 0.5,
            py: 0.75,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <IconButton size="small" onClick={() => setOpen((v) => !v)}>
            {open ? (
              <ChevronLeftIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
        {actionButtons()}
        <Divider />
        {navList()}
      </Box>
      {importDialog}
    </>
  );
}
