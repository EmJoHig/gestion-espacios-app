import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getActividadesRequest,
  createActividadRequest,
  updateActividadRequest,
  deleteActividadRequest,
} from "../api/actividad.js";

const ActividadContext = createContext();

export const useActividad = () => {
  const context = useContext(ActividadContext);
  if (!context) throw new Error("useActividad must be used within a ActividadProvider");
  return context;
};

export function ActividadProvider({ children }) {
  const [actividades, setActividades] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getActividades = async () => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getActividadesRequest(token);
      setActividades(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching actividades:', error);
    }
  };


  const createActividad = async (actividad) => {
    try {
      const res = await createActividadRequest(actividad);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateActividad = async (id, actividad) => {
    try {
      await updateActividadRequest(id, actividad);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteActividad = async (id) => {
    try {
      const res = await deleteActividadRequest(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ActividadContext.Provider
      value={{
        actividades,
        getActividades,
        createActividad,
        updateActividad,
        deleteActividad,
      }}
    >
      {children}
    </ActividadContext.Provider>
  );
}
