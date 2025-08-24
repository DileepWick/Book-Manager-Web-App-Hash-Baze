"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_BOOK, UPDATE_BOOK } from "../../../graphql/books";
import { Book, BookInput } from "../../../types/book";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Header from "../../../components/header";
import AuthGuard from "../../../components/authGuard";
import '../../styles/UpdateBook.css';

export default function UpdateBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState<BookInput>({
    title: "",
    author: "",
    publishedYear: 0,
    genre: "",
  });

  const { data, loading, error } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: { id },
    skip: !id,
  });

  const [updateBook, { loading: updating }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => setSuccessMessage("Book updated successfully!"),
    onError: (err) => setErrorMessage(err.message),
  });

  useEffect(() => {
    if (data?.book) {
      setFormState({
        title: data.book.title,
        author: data.book.author,
        publishedYear: data.book.publishedYear,
        genre: data.book.genre,
      });
    }
  }, [data]);

  if (loading)
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <>
        <Header />
        <Box className="error-container">
          <Alert severity="error">Error fetching book: {error.message}</Alert>
        </Box>
      </>
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.title || !formState.author || !formState.genre) {
      setErrorMessage("All fields are required");
      return;
    }

    if (
      formState.publishedYear < 1500 ||
      formState.publishedYear > currentYear
    ) {
      setErrorMessage(`Published year must be between 1500 and ${currentYear}`);
      return;
    }

    updateBook({
      variables: { id, input: formState },
    });
  };

  return (
    <AuthGuard>
      <Header />

      <Box className="update-form-container">
        <Typography variant="h4" className="update-form-title">
          Update Book
        </Typography>

        {errorMessage && (
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={4000}
            onClose={() => setErrorMessage(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Alert>
          </Snackbar>
        )}

        {successMessage && (
          <Snackbar
            open={!!successMessage}
            autoHideDuration={3000}
            onClose={() => {
              setSuccessMessage(null);
              router.push("/books");
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMessage(null);
                router.push("/books");
              }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        )}

        <form onSubmit={handleSubmit} className="update-form">
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
            className="update-input"
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={formState.author}
            onChange={(e) =>
              setFormState({ ...formState, author: e.target.value })
            }
            className="update-input"
          />
          <TextField
            label="Published Year"
            fullWidth
            margin="normal"
            type="number"
            value={formState.publishedYear}
            onChange={(e) =>
              setFormState({ ...formState, publishedYear: Number(e.target.value) })
            }
            className="update-input"
          />
          <TextField
            label="Genre"
            fullWidth
            margin="normal"
            value={formState.genre}
            onChange={(e) =>
              setFormState({ ...formState, genre: e.target.value })
            }
            className="update-input"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="update-button"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Box>
    </AuthGuard>
  );
}
