import { createContext, useContext, useState } from "react";
import {
  // createUsuarioRequest,
  // deleteUsuarioRequest,
  getUsuariosRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
  getUsuarioAuth0Request,
  getUsuariosAUTH0Request,
  getUserByIdAUTH0Request,
} from "../api/usuario";
import { useAuth0 } from "@auth0/auth0-react";

const UsuarioContext = createContext();

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario must be used within a UsuarioProvider");
  return context;
};

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  const getUsuarios = async () => {

    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',// USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const res = await getUsuariosRequest(token);
      // console.log("res.data");
      // console.log(res.data);
      setUsuarios(res.data);
      return res.data;

  } catch (error) {
      console.error('Error fetching usuarios:', error);
      return []; // o cualquier valor por defecto apropiado
  }

  };

  const deleteUsuario = async (id) => {
    try {
      // const res = await deleteUsuarioRequest(id);
      // if (res.status === 204) setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createUsuario = async (usuario) => {
    try {
      // const res = await createUsuarioRequest(usuario);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsuario = async (usuario) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const resp = await updateUsuarioRequest(token, usuario);

      if (resp.status === 200) {
        return resp.data;
      } else {
        return null;
      }

    } catch (error) {
      console.error(error);
    }
  };


  //chequea que el usuario logueado este en auth0, sino lo esta lo crea en mi bd
  const getUsuarioAuth0 = async (usuario) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const resp = await getUsuarioAuth0Request(token, usuario);

      if (resp.status === 200) {
        return "";
      } else {
        return "hubo un error al obtenr usuario auth0 el rol";
      }

    } catch (error) {
      console.error(error);
    }
  };



  // obtiene usuarios de AUTH0
  const getUsuariosAUTH0 = async () => {

    try {
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const resp = await getUsuariosAUTH0Request(token);
      
      console.log("resp");
      console.log(resp.data);

      if (resp.status === 200) {

        setUsuarios(resp.data.data);

        return "";
      } else {
        return "hubo un error al obtener usuarios de auth0";
      }

    } catch (error) {
      console.error(error);
    }

  };



  // obtiene un usaurio por idAUTH0
  const getUserByIdAUTH0 = async (id) => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/',
      });

      const res = await getUserByIdAUTH0Request(token, id);
      
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        getUsuarios,
        // deleteUsuario,
        // createUsuario,
        getUsuario,
        updateUsuario,
        getUsuarioAuth0,
        getUsuariosAUTH0,
        getUserByIdAUTH0,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
