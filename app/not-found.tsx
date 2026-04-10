"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 4rem)"
      gap={2}
    >
      <Typography variant="h1" fontWeight={700} sx={{ fontSize: "6rem", color: "text.disabled" }}>
        404
      </Typography>
      <Typography variant="h6" fontWeight={600}>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary">Такой страницы не существует.</Typography>
      <Button onClick={() => router.push("/applications")} variant="contained">
        На главную
      </Button>
    </Box>
  );
}
