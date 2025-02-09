import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getEspaciosRequest,
  getEspacioRequest,
  createEspacioRequest,
  updateEspacioRequest,
  deleteEspacioRequest,
  getTiposEspacioRequest,
} from "../api/espacio.js";

const EspacioContext = createContext();

export const useEspacio = () => {
  const context = useContext(EspacioContext);
  if (!context) throw new Error("useEspacio must be used within a EspacioProvider");
  return context;
};

export function EspacioProvider({ children }) {
  const [espacios, setEspacios] = useState([]);
  const [tiposEspacios, setTiposEspacios] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getEspacios = async () => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getEspaciosRequest(token);
      //const espacios = res.data.map((espacio) => espacio.nombre);
      setEspacios(res.data);
    } catch (error) {
      console.error('Error fetching espacios:', error);
    }
  };


   const getEspacio = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getEspacioRequest(token, id);

      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  const createEspacio = async (espacio) => {
    try {
      const res = await createEspacioRequest(espacio);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateEspacio = async (id, espacio) => {
    try {
      await updateEspacioRequest(id, espacio);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteEspacio = async (id) => {
    try {
      const res = await deleteEspacioRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


   const getTiposEspacio = async () => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getTiposEspacioRequest(token);

      setTiposEspacios(res.data);
    } catch (error) {
      console.error('Error fetching espacios:', error);
    }
  }; 


  return (
    <EspacioContext.Provider
      value={{
        tiposEspacios,
        espacios,
        getEspacios,
        getEspacio,
        createEspacio,
        updateEspacio,
        deleteEspacio,
        getTiposEspacio,
      }}
    >
      {children}
    </EspacioContext.Provider>
  );
}
