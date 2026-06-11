import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

export const ProtectedRoutes = () => {
  const { user,loading } = useUser();
  if(loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
