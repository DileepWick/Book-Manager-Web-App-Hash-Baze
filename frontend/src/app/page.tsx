"use client";

import { Box, Typography, Paper, Stack, List, ListItem, ListItemText } from "@mui/material";
import Header from "./components/header";
import './styles/Home.css';

export default function Home() {
  return (
    <>
      <Header />

      <Box className="home-container">
        <Paper className="home-card" elevation={3}>
          <Stack spacing={3}>
            <Typography variant="h3" className="home-title">
              Welcome to the Book Management App
            </Typography>

            <Typography variant="body1" className="home-subtitle">
              Manage your book collection easily! Here’s what you can do:
            </Typography>

            <List className="home-list">
              <ListItem>
                <ListItemText primary="Add new books with title, author, genre, and published year." />
              </ListItem>
              <ListItem>
                <ListItemText primary="View all books in your collection." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Update book details whenever needed." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Delete books from your collection." />
              </ListItem>
            </List>

            <Typography variant="body2" className="home-footer">
              Use the navigation above to get started.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
