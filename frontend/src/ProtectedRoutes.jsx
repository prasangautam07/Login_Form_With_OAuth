import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";
import { getSession } from "./api/authapi";

export const ProtectedRoutes = () => {
  const { setUser } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getSession();
        console.log(res.data);
          if (res && res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);
  if(isAuthenticated===null) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
