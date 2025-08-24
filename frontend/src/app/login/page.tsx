"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGIN } from "../graphql/auth";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../components/header";
import './styles.css'; 

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [login] = useMutation(LOGIN, {
    onError: (err) => setErrorMessage(err.message),
    onCompleted: () => {
      setErrorMessage(null);
      router.push("/");
    },
    context: {
      credentials: "include",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Both fields are required");
      return;
    }
    login({ variables: { input: { username, password } } });
  };

  return (
    <>
      <Header />
      <Box className="login-container">
        <Paper className="login-card" elevation={6}>
          <Typography variant="h4" className="login-title">
            Login
          </Typography>

          {errorMessage && <Alert severity="error" className="login-error">{errorMessage}</Alert>}

          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <Button type="submit" variant="contained" className="login-button" fullWidth>
              Login
            </Button>
          </form>

          <Divider className="login-divider" />

          <Typography variant="body2" className="login-footer">
            Don't have an account?{" "}
            <Link href="/register" className="login-register-link">
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
