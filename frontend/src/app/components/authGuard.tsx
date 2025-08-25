"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "../graphql/auth";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import './styles/AuthGuard.css';



export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  // GraphQL query to check if user is authenticated
  const { data, loading, error } = useQuery<MeQueryResult>(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading) {
      if (data?.me?.username) {
        setChecking(false);
      } else {
        setShowDialog(true);
        const timer = setTimeout(() => router.replace("/login"), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [data, loading, router]);

  // Show dialog if there's an error
  useEffect(() => {
    if (error) {
      setShowDialog(true);
      const timer = setTimeout(() => router.replace("/login"), 1500);
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  if (loading || checking) {
    return (
      <Box className="ag-container">
        <CircularProgress className="ag-spinner" />
        <Dialog open={showDialog} className="ag-dialog">
          <DialogTitle className="ag-title">Login Required</DialogTitle>
          <DialogContent className="ag-content">
            <Typography className="ag-text">
              You need to login to use this feature. Redirecting...
            </Typography>
          </DialogContent>
          <DialogActions className="ag-actions">
            <Button className="ag-btn" onClick={() => router.replace("/login")}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return <>{children}</>;
}
