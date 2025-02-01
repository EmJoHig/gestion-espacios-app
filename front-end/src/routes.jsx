import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUsuario } from "./context/usuarioContext";

import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ allowedRoles }) => {
  // const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { getUserByIdAUTH0 } = useUsuario();
  const [isAllowed, setIsAllowed] = useState(false);


  // useEffect(() => {
  //   if (user) {
  //     const id = user.sub;
  //     const fetchUserRole = async () => {
  //       try {
  //         const usuario = await getUserByIdAUTH0(id);
  //         console.log("usuario: ", usuario);
  //         console.log("allowedRoles: ", allowedRoles);

  //         if (allowedRoles && allowedRoles.includes(usuario.rol.name)) {
  //           setIsAllowed(true);
  //         } else {
  //           setIsAllowed(false);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user role:", error);
  //       }
  //     };
  //     fetchUserRole();
  //   }
  // }, [user, allowedRoles, getUserByIdAUTH0]);

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        try {
          const id = user.sub;
          const usuario = await getUserByIdAUTH0(id);
          // Convertir ambos lados a minúsculas para comparación insensible
          const userRole = usuario?.rol?.name || "";
          const allowedRolesLower = allowedRoles.map(role => role);

          // console.log("Rol del usuario:", usuario.rol.name);
          // console.log("Roles permitidos:", allowedRoles);
          if (userRole === "") {
            // setIsAllowed(false);
            navigate("/home");
          } else
            if (allowedRolesLower.includes(userRole)) {
              // setIsAllowed(true);
            } else {
              // setIsAllowed(false);
              navigate("/home");
            }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAllowed(false);
          navigate("/home");
        }
      }
    };
    checkAccess();
  }, [user, allowedRoles, getUserByIdAUTH0, navigate]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);





  if (isLoading) return <h1>Loading...</h1>;

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return null; // Evita que el componente siga renderizando
  }
  // if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return null; // Retorna null para evitar que el componente siga renderizando.
  }

  return <Outlet />;
};
