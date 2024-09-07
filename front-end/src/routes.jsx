import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./context/authContext";
import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = () => {
  // const { isAuthenticated, loading } = useAuth();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <h1>Loading...</h1>;

  // if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return null; // Retorna null para evitar que el componente siga renderizando.
  }
  
  return <Outlet />;
};
