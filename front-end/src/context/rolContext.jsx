import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getRolesPorUsuarioRequest,
  getRolesAUTH0Request,
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


  const getRolesPorUsuario = async () => {    
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',// USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const res = await getRolesPorUsuarioRequest(token);
      //setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };


  // obtiene usuarios de AUTH0
  const getRolesAUTH0 = async () => {

    try {
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const resp = await getRolesAUTH0Request(token);
      
      if (resp.status === 200) {

        setRoles(resp.data.data);

        return "";
      } else {
        return "hubo un error al obtener usuarios de auth0";
      }

    } catch (error) {
      console.error(error);
    }

  };


  const createRol = async (idUsuarioAuth0, rol) => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      const res = await createRolRequest(token, idUsuarioAuth0, rol);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al crear el rol context";
      }

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

      const resp = await updateRolRequest(token, rol);

      if (resp.status === 200) {
        return "";
      } else {
        return "hubo un error al editar el rol";
      }

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

      const resp = await deleteRolRequest(token, id);

      if (resp.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar el rol";
      }

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
      
      if (res.status === 200) {
        return "";
      } else {
        return "Hubo un error al asociar el rol al usuario";
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <RolContext.Provider
      value={{
        roles,
        getRolesPorUsuario,
        getRolesAUTH0,
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
