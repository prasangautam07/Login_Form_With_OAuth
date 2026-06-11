import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

export const PublicRoutes = () => {
  const { user,loading  } = useUser();

  if (loading) return null;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};