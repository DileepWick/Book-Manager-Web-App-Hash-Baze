"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK } from "../../graphql/books";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Header from "../../components/header";
import AuthGuard from "../../components/authGuard";
import "../styles/AddNewBook.css";

export default function NewBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState<number | "">("");
  const [genre, setGenre] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    onError: (err) => {
      setErrorMessage(err.message);
      setSuccessMessage(null);
    },
    onCompleted: () => {
      setTitle("");
      setAuthor("");
      setPublishedYear("");
      setGenre("");
      setErrorMessage(null);
      setSuccessMessage("Book created successfully! 🎉");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !publishedYear || !genre) {
      setErrorMessage("All fields are required.");
      setSuccessMessage(null);
      return;
    }

    createBook({
      variables: {
        input: {
          title,
          author,
          publishedYear: Number(publishedYear),
          genre,
        },
      },
    });
  };

  const closeAlert = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <AuthGuard>
      <Header />

      {/* Alerts */}
      {(successMessage || errorMessage) && (
        <Box className="alert-box">
          <Alert
            severity={successMessage ? "success" : "error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={closeAlert}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {successMessage || errorMessage}
          </Alert>
        </Box>
      )}

      <Box className="form-container">
        <Paper className="form-card" elevation={3}>
          <Typography variant="h4" className="form-title" gutterBottom>
            Add New Book
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Enter Title"
                fullWidth
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />

              <TextField
                label="Enter Author's Name"
                fullWidth
                size="small"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-input"
              />

              <TextField
                label="Published Year"
                fullWidth
                size="small"
                type="number"
                value={publishedYear === "" ? "" : publishedYear}
                onChange={(e) => {
                  const val = (e.target as HTMLInputElement).valueAsNumber;
                  setPublishedYear(isNaN(val) ? "" : val);
                }}
                className="form-input"
                inputProps={{
                  min: 1500,
                  max: new Date().getFullYear(),
                }}
              />
              <TextField
                label="Genre"
                fullWidth
                size="small"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="form-input"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                className="form-button"
              >
                {loading ? "Creating Book... ⏳" : "Add Book 📖"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </AuthGuard>
  );
}
