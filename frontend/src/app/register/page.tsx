"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../graphql/auth";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import Header from "../components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function RegisterPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [registerUser, { loading }] = useMutation<
    RegisterMutationResult,
    RegisterMutationVars
  >(REGISTER_USER, {
    onCompleted: (data) => {
      setSuccessMessage(`User ${data.register.username} registered!`);
      setGeneralError(null);
      setFieldErrors({});
      setFormState({ username: "", password: "", confirmPassword: "" });
      setTimeout(() => router.push("/login"), 1500);
    },
    onError: (err) => {
      // Fallback: show general message
      setGeneralError(err.message);
      setSuccessMessage(null);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    // Username validation
    if (!formState.username) {
      errors.username = "Username is required";
    }

    // Password validation
    if (!formState.password) {
      errors.password = "Password is required";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation
    if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setGeneralError(null);

    registerUser({
      variables: {
        input: { username: formState.username, password: formState.password },
      },
    });
  };

  return (
    <>
      <Header />
      <Box className="register-container">
        <Paper className="register-paper" elevation={3}>
          <Typography variant="h4" gutterBottom className="register-title">
            Create Account
          </Typography>

          {generalError && (
            <Alert severity="error" className="alert">
              {generalError}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" className="alert">
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={formState.username}
              error={!!fieldErrors.username}
              helperText={fieldErrors.username || ""}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={formState.password}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password || ""}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={formState.confirmPassword}
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword || ""}
              onChange={(e) =>
                setFormState({ ...formState, confirmPassword: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="register-button"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" className="login-link-text">
            Already have an account?{" "}
            <Link href="/login" className="login-link">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
