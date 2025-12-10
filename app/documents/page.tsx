"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { DocumentModal } from "../components/DocumentModal";

interface Document {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface TableDocument {
  id: number;
  fileName: string;
  version: string;
  size: string;
  uploadDate: string;
  userId: number;
  body: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<TableDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] =
    useState<TableDocument | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = response.data.slice(0, 10);

      const mappedDocuments: TableDocument[] = posts.map(
        (post: Document, index: number) => ({
          id: post.id,
          fileName: `${post.title.substring(0, 30)}.pdf`,
          version: `v1.${index}`,
          size: `${Math.floor(Math.random() * 500 + 100)} KB`,
          uploadDate: new Date(
            Date.now() - Math.random() * 10000000000
          ).toLocaleDateString("ru-RU"),
          userId: post.userId,
          body: post.body,
        })
      );

      setDocuments(mappedDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (document: TableDocument) => {
    setSelectedDocument(document);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div className="mb-2">
        <Typography variant="h4" component="h1" gutterBottom>
          Документы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Список загруженных документов
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Название файла</b>
              </TableCell>
              <TableCell>
                <b>Версия</b>
              </TableCell>
              <TableCell>
                <b>Размер</b>
              </TableCell>
              <TableCell>
                <b>Дата загрузки</b>
              </TableCell>
              <TableCell align="center">
                <b>Действия</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} hover>
                <TableCell>{doc.fileName}</TableCell>
                <TableCell>{doc.version}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenModal(doc)}
                  >
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DocumentModal
        open={modalOpen}
        document={selectedDocument}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
