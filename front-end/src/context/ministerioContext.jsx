import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getMinisteriosRequest,
  // getMinisterioRequest,
  createMinisterioRequest,
  updateMinisterioRequest,
  deleteMinisterioRequest,
  asociarResponsableAMinistRequest,
  GetActividadesMinisterioRequest
} from "../api/ministerio";

const MinisterioContext = createContext();

export const useMinisterio = () => {
  const context = useContext(MinisterioContext);
  if (!context) throw new Error("useMinisterios must be used within a MinisterioProvider");
  return context;
};

export function MinisterioProvider({ children }) {
  const [ministerios, setMinisterios] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getMinisterios = async () => {
    // const res = await getMinisteriosRequest();
    // setMinisterios(res.data);
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getMinisteriosRequest(token);
      setMinisterios(res.data);
    } catch (error) {
      console.error('Error fetching ministerios:', error);
    }
  };

  //   const getMinisterio = async (id) => {
  //     try {
  //       const res = await getMinisterioRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const createMinisterio = async (ministerio) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await createMinisterioRequest(token, ministerio);
      if (res.status == 200) {
        return "";
      } else {
        return "Error al crear el ministerio";
      }

    } catch (error) {
      console.log(error);
    }
  };



  const updateMinisterio = async (ministerio) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await updateMinisterioRequest(token, ministerio);
      if (res.status == 200) {
        return "";
      } else {
        return "Error al editar el ministerio";
      }
    } catch (error) {
      console.error(error);
    }
  };


  const deleteMinisterio = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await deleteMinisterioRequest(token, id);
      if (res.status == 200) {
        return "";
      } else {
        return "Error al eliminar el ministerio";
      }
    } catch (error) {
      console.log(error);
    }
  };



  //ASOCIAR RESPONSABLE A MINISTERIO
  const AsociarResponsableAMinist = async (bodyUsuaroMinist) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      // console.log("token");
      // console.log(token);

      const res = await asociarResponsableAMinistRequest(token, bodyUsuaroMinist);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al Asociar Responsable a Ministerio";
      }
    } catch (error) {
      console.log(error);
    }
  };


  //ACTIVIDADES ASOCIADAS A MINISTERIO

  const getActividadesMinisterio = async (bodyIdMinisterio) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api', // USAR ESTE
        // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
      });

      const res = await GetActividadesMinisterioRequest(token, bodyIdMinisterio);
      
      if (res.status == 200) {
        return res;
      } else {
        return null;
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <MinisterioContext.Provider
      value={{
        ministerios,
        getMinisterios,
        // getMinisterio,
        createMinisterio,
        updateMinisterio,
        deleteMinisterio,
        AsociarResponsableAMinist,
        getActividadesMinisterio
      }}
    >
      {children}
    </MinisterioContext.Provider>
  );
}
