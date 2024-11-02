import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getRolesRequest,
  // getRolRequest,
  createRolRequest,
  updateRolRequest,
  deleteRolRequest,
  asociarRolAlUsuarioRequest,
} from "../api/rol";

const RolContext = createContext();

const TOKEN_AUTH0 = import.meta.env.VITE_AUTH0_TOKEN;

export const useRol = () => {
  const context = useContext(RolContext);
  if (!context) throw new Error("useRoles must be used within a RolProvider");
  return context;
};

export function RolProvider({ children }) {
  const [roles, setRoles] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getRoles = async () => {    
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',// USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const res = await getRolesRequest(token);
      setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  //   const getRol = async (id) => {
  //     try {
  //       const res = await getRolRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const createRol = async (idUsuarioAuth0, rol) => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      const res = await createRolRequest(token, idUsuarioAuth0, rol);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateRol = async (rol) => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      await updateRolRequest(token, rol);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteRol = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const res = await deleteRolRequest(token, id);
      
    } catch (error) {
      console.log(error);
    }
  };


  //ASOCIAR ROL A USUARIO
  const AsociarRolAlUsuario = async (bodyUsuaroRol) => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      const res = await asociarRolAlUsuarioRequest(token, bodyUsuaroRol);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <RolContext.Provider
      value={{
        roles,
        getRoles,
        // getRol,
        createRol,
        updateRol,
        deleteRol,
        AsociarRolAlUsuario,
      }}
    >
      {children}
    </RolContext.Provider>
  );
}
