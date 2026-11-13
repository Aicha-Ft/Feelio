import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ roleRequis }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/" replace />;
  if (roleRequis && role !== roleRequis) return <Navigate to="/" replace />;
  return <Outlet />;
}