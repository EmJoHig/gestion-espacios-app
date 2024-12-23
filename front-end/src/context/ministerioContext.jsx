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
      const res = await createMinisterioRequest(ministerio);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateMinisterio = async (id, ministerio) => {
    try {
      await updateMinisterioRequest(id, ministerio);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteMinisterio = async (id) => {
    try {
      const res = await deleteMinisterioRequest(id);
      console.log("response delete minist");
      console.log(res);
      // if (res.status === 204) setMinisterios(ministerios.filter((ministerio) => ministerio._id !== id));
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

      const res = await asociarResponsableAMinistRequest(token, bodyUsuaroMinist);
      // console.log(res.data);
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
      // console.log(res.data);
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
