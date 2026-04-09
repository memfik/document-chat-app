"use client";

import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  Paper,
} from "@mui/material";

export interface ApplicationRow {
  id: string;
  date: string;
  initiator: string;
  type: string;
  description: string;
  cost: string;
  currency: string;
  contractNum: string;
  executor: string;
  status: string;
  contract: string;
  updatedAt: string;
  article: string;
  znoNum: string;
}

interface InfoModalProps {
  row: ApplicationRow;
  statusLabel: string;
  statusColor: string;
  paymentFileName?: string;
  onClose: () => void;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        textTransform="uppercase"
        letterSpacing={0.8}
        display="block"
        mb={1.5}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Field({
  label,
  value,
  wide,
}: {
  label: string;
  value: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Box sx={wide ? { gridColumn: "span 2" } : {}}>
      <Typography
        variant="caption"
        color="text.disabled"
        display="block"
        mb={0.25}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500} color="text.primary">
        {value || "—"}
      </Typography>
    </Box>
  );
}

function FileLink({
  name,
  exists = true,
  onView,
}: {
  name: string;
  exists?: boolean;
  onView?: () => void;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={1.5}
      py={1}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: exists ? "divider" : "divider",
        borderStyle: exists ? "solid" : "dashed",
        bgcolor: exists ? "background.paper" : "action.hover",
        transition: "border-color 0.2s",
        ...(exists && { "&:hover": { borderColor: "text.disabled" } }),
      }}
    >
      <Box display="flex" alignItems="center" gap={1} minWidth={0}>
        <DescriptionIcon
          fontSize="small"
          sx={{ color: exists ? "info.main" : "text.disabled", flexShrink: 0 }}
        />
        <Typography
          variant="body2"
          color={exists ? "text.primary" : "text.disabled"}
          noWrap
        >
          {name}
        </Typography>
      </Box>
      {exists && onView && (
        <Button
          size="small"
          startIcon={<VisibilityIcon sx={{ fontSize: "13px !important" }} />}
          onClick={onView}
          sx={{
            textTransform: "none",
            fontSize: 12,
            ml: 1,
            flexShrink: 0,
            borderRadius: 2,
          }}
        >
          Просмотр
        </Button>
      )}
    </Box>
  );
}

export function InfoModal({
  row,
  statusLabel,
  statusColor,
  paymentFileName,
  onClose,
}: InfoModalProps) {
  const costWithVat = row.cost.replace(/\s/g, "");
  const costNum = parseInt(costWithVat.replace(/\D/g, ""), 10) || 0;
  const costWithoutVat = Math.round(costNum / 1.12).toLocaleString("ru-RU");
  const vat = Math.round(costNum - costNum / 1.12).toLocaleString("ru-RU");

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={2}
        >
          <Box minWidth={0}>
            <Typography variant="subtitle1" fontWeight={700}>
              Заявка №{row.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {row.description}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<HistoryIcon fontSize="small" />}
              onClick={() => window.open(`/history/${row.id}`, "_blank")}
              sx={{
                textTransform: "none",
                borderColor: "divider",
                color: "text.secondary",
                borderRadius: 2,
              }}
            >
              История
            </Button>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: "text.secondary" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <SectionCard title="Основная информация">
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Field label="№ заявки" value={row.id} />
            <Field
              label="Статус"
              value={
                <Chip
                  label={statusLabel}
                  size="small"
                  sx={{
                    bgcolor: statusColor,
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 11,
                  }}
                />
              }
            />
            <Field label="Дата поступления" value={row.date} />
            <Field label="Тип" value={row.type} />
            <Field label="Инициатор" value={row.initiator} />
            <Field label="Исполнитель" value={row.executor} />
            <Field label="Статья" value={row.article} />
            <Field label="Метод закупа" value="Запрос ценовых предложений" />
            <Field
              label="Стоимость (с НДС)"
              value={
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="text.primary"
                  component="span"
                >
                  {row.cost} {row.currency}
                </Typography>
              }
            />
            <Field
              label="Стоимость (без НДС)"
              value={`${costWithoutVat} ${row.currency}`}
            />
          </Box>
        </SectionCard>

        <Divider />

        <SectionCard title="Паспорт договора">
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <Field label="Поставщик" value="ТОО «ТехСнаб»" wide />
            <Field
              label="Сумма договора"
              value={
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="text.primary"
                  component="span"
                >
                  {row.cost} {row.currency}
                </Typography>
              }
            />
            <Field label="НДС (12%)" value={`${vat} ${row.currency}`} />
            <Field label="№ договора" value={row.contractNum} />
            <Field label="Дата договора" value={row.date} />
            <Field label="Условия оплаты" value="30 дней с момента поставки" />
            <Field label="Форма договора" value="Рамочный" />
          </Box>
        </SectionCard>

        <Divider />

        <SectionCard title="Согласование">
          <Box display="flex" flexDirection="column" gap={1}>
            <FileLink name="Форма 16" onView={() => {}} />
            <FileLink name="Протокол согласования" onView={() => {}} />
            <FileLink name="Договор" onView={() => {}} />
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              gap={2}
              mt={0.5}
              px={0.5}
            >
              <Field label="№ ЗНО" value={row.znoNum} />
              <Field
                label="Платежный документ"
                value={
                  paymentFileName ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                      component="span"
                    >
                      <AttachFileIcon
                        sx={{ fontSize: 13, color: "info.main" }}
                      />
                      <Typography
                        variant="body2"
                        color="info.main"
                        component="span"
                      >
                        {paymentFileName}
                      </Typography>
                    </Box>
                  ) : (
                    "—"
                  )
                }
              />
            </Box>
          </Box>
        </SectionCard>

        <Divider />

        <SectionCard title="Документы и файлы">
          <Box display="flex" flexDirection="column" gap={1}>
            <FileLink name="Техническая спецификация.pdf" onView={() => {}} />
            <FileLink name="Приложение №1.xlsx" onView={() => {}} />
            <FileLink name="Файл договора.pdf" onView={() => {}} />
            <FileLink name="Анализ предложений.pdf" onView={() => {}} />
            <FileLink name="Прочие документы" exists={false} />
          </Box>
        </SectionCard>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 1.5, justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.disabled">
          Последнее изменение: {row.updatedAt}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderColor: "divider",
            color: "text.secondary",
            borderRadius: 2,
          }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
