"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Paper,
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
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: { xs: 0, sm: 2 },
        backgroundColor: "#0f172a",
        backgroundImage: `
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(236,72,153,0.15), transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 60%)
  `,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: 440 },
          minHeight: { xs: "100vh", sm: "auto" },
          px: { xs: 3, sm: 5 },
          py: { xs: 6, sm: 5 },
          borderRadius: { xs: 0, sm: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "flex-start" },
          gap: 3,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <img
            src="/logo-jusanmobile.png"
            alt="Logo"
            style={{ height: 64, objectFit: "contain" }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={700}
            textAlign="center"
            color="text.primary"
          >
            Служба сопровождения контрактов
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={2}
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
              mt: 1,
              bgcolor: "#f96800",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 15,
              "&:hover": { bgcolor: "#e05a00" },
            }}
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
