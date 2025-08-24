"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_BOOK } from "../../../graphql/books";
import { Book } from "../../../types/book";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../../../components/header";
import AuthGuard from "../../../components/authGuard";
import "../../styles/ViewBook.css";

export default function ViewBookPage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: { id },
    skip: !id,
  });

  if (loading)
    return (
      <Box className="view-loading-container">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <>
        <Header />
        <Box className="view-error-container">
          <Alert severity="error">Error fetching book: {error.message}</Alert>
        </Box>
      </>
    );

  if (!data?.book)
    return (
      <>
        <Header />
        <Box className="view-error-container">
          <Alert severity="info">Book not found.</Alert>
        </Box>
      </>
    );

  const book = data.book;

  return (
    <AuthGuard>
      <Header />
      <Box className="view-book-container">
        <Paper className="view-book-card" elevation={3}>
          <Typography variant="h4" className="view-book-title">
            {book.title}
          </Typography>
          <Divider className="view-divider" />

          <Box className="view-book-details">
            <Typography variant="subtitle1" className="view-book-detail">
              <strong>Author:</strong> {book.author}
            </Typography>
            <Typography variant="subtitle1" className="view-book-detail">
              <strong>Published Year:</strong> {book.publishedYear}
            </Typography>
            <Typography variant="subtitle1" className="view-book-detail">
              <strong>Genre:</strong> {book.genre}
            </Typography>
            <Typography variant="subtitle2" className="view-book-detail-id">
              Book ID: {book.id}
            </Typography>
          </Box>

          <Box className="view-book-summary">
            <Typography variant="body1">
              This book <strong>"{book.title}"</strong> was written by{" "}
              <strong>{book.author}</strong> and published in the year{" "}
              <strong>{book.publishedYear}</strong>. It falls under the genre{" "}
              <strong>{book.genre}</strong>.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </AuthGuard>
  );
}
