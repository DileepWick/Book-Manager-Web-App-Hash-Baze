"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client/react";
import { ME_QUERY, LOGOUT } from "../graphql/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import "./styles/Header.css";


export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  // Query to fetch user details
  const { data, loading } = useQuery<MeQueryResult>(ME_QUERY);

  // Mutation for logout
  const [logout, { loading: loggingOut }] = useMutation(LOGOUT, {
    onCompleted: () => {
      setUsername(null);
      router.push("/");
      window.location.reload();
    },
    onError: (err) => console.error("Logout failed", err),
  });

  // Update username when data changes
  useEffect(() => {
    if (!loading) setUsername(data?.me?.username || null);
  }, [data, loading]);

  return (
    <AppBar
      position="static"
      className="appBar"
      sx={{
        backgroundColor: "#000000", 
        color: "#ffffff", 
      }}
    >
      <Toolbar className="toolbar">
        <Typography variant="h5" className="brand">
          Book Management
        </Typography>

        <Box className="navLinks">
          <Button href="/" className="navButton">
            Home
          </Button>
          <Button href="/books" className="navButton">
            Books
          </Button>
          <Button href="/books/new" className="navButton">
            Add Book
          </Button>

          {loading ? (
            <CircularProgress size={20} className="loadingSpinner" />
          ) : username ? (
            <Box className="userBox">
              <Typography className="username">{username}</Typography>
              <Button
                variant="outlined"
                onClick={() => logout()}
                disabled={loggingOut}
                className="logoutButton"
              >
                {loggingOut ? (
                  <CircularProgress size={16} className="loadingSpinner" />
                ) : (
                  "Logout"
                )}
              </Button>
            </Box>
          ) : (
            <Button href="/login" variant="outlined" className="loginButton">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
