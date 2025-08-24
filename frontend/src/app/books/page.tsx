"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_BOOKS, DELETE_BOOK } from "../graphql/books";
import { Book } from "../types/book";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import Header from "../components/header";
import { useRouter } from "next/navigation";
import AuthGuard from "../components/authGuard";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import InfoIcon from "@mui/icons-material/Info";
import "../books/styles/AllBooks.css";

export default function BooksPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const booksPerPage = 5;

  const { data, loading, error } = useQuery<{ books: Book[] }>(GET_BOOKS, {
    fetchPolicy: "network-only",
    context: { credentials: "include" },
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    context: { credentials: "include" },
  });

  const handleDeleteClick = (id: string) => {
    setBookToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook({ variables: { id: bookToDelete } });
      setSnackbarMessage("Book deleted successfully!");
      setShowSnackbar(true);
    } catch (err: any) {
      setSnackbarMessage("Error deleting book: " + err.message);
      setShowSnackbar(true);
    } finally {
      setConfirmDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setBookToDelete(null);
  };

  const handleUpdate = (id: string) => router.push(`/books/update/${id}`);
  const handleView = (id: string) => router.push(`/books/view/${id}`);
  const handlePageChange = (_e: any, value: number) => setPage(value);
  const handleCloseSnackbar = () => setShowSnackbar(false);

  const books = data?.books ?? [];
  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.genre].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  return (
    <AuthGuard>
      <Header />
      <Box className="books-page-container">
        <Typography variant="h4" className="books-page-title">
          All Books
        </Typography>

        <TextField
          label="Search by title, author, or genre"
          fullWidth
          size="small"
          margin="normal"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="books-search-input"
        />

        {loading ? (
          <Box className="loading-container">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" className="error-alert">
            Error fetching books: {error.message}
          </Alert>
        ) : filteredBooks.length === 0 ? (
          <Typography className="no-books-text">
            No books match your search.
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} className="books-table-container">
              <Table className="books-table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Author</strong></TableCell>
                    <TableCell><strong>Published Year</strong></TableCell>
                    <TableCell><strong>Genre</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.publishedYear}</TableCell>
                      <TableCell>{book.genre}</TableCell>
                      <TableCell align="right" className="books-actions-cell">
                        <Tooltip title="Edit">
                          <IconButton
                            className="update-button"
                            onClick={() => handleUpdate(book.id)}
                          >
                            <EditDocumentIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Info">
                          <IconButton
                            className="info-button"
                            onClick={() => handleView(book.id)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            className="delete-button"
                            onClick={() => handleDeleteClick(book.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pageCount > 1 && (
              <Box className="pagination-container">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        {/* Snackbar for feedback */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          message={snackbarMessage}
        />

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this book? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={handleCancelDelete}>Cancel</MuiButton>
            <MuiButton color="error" onClick={handleConfirmDelete}>
              Delete
            </MuiButton>
          </DialogActions>
        </Dialog>
      </Box>
    </AuthGuard>
  );
}
