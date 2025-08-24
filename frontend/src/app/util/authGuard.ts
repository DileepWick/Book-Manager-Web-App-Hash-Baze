"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setNeedsLogin(true);

      // Auto-redirect after 5 seconds
      const timeout = setTimeout(() => {
        router.replace("/");
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      setChecking(false); // Allow page render
    }
  }, [router]);

  return { checking, needsLogin };
}
