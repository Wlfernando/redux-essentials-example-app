import { useAppSelector } from "@/store/hooks";
import { selectUserName } from "./authSlice";
import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const username = useAppSelector(selectUserName);

  if (!username)
    return <Navigate to="/" replace />

  return children
}
