"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

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
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "60%",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="/login-bg.png"
          alt="Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            objectPosition: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6, lg: 10 },
          py: 6,
          bgcolor: "background.default",
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box
              component="img"
              src="/logo-jusanmobile.png"
              alt="Logo"
              sx={{ height: 52, objectFit: "contain" }}
            />
          </Box>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={0.75}
            color="text.primary"
            textAlign="center"
          >
            Добро пожаловать
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={4}
            textAlign="center"
          >
            Введите данные для входа в систему
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2.5}
          >
            <TextField
              label="Почта"
              type="email"
              size="small"
              fullWidth
              required
              placeholder="example@jusanmobile.kz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#f96800" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#f96800" },
              }}
            />

            <TextField
              label="Пароль"
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#f96800" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#f96800" },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 0.5,
                bgcolor: "#f96800",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 15,
                py: 1.25,
                "&:hover": { bgcolor: "#e05a00" },
              }}
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
