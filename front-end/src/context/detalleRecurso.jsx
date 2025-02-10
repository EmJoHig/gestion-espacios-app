import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getDetallesRecursosRequest,
  createDetalleRecursoRequest,
  updateDetalleRecursoRequest,
  deleteDetalleRecursoRequest,
} from "../api/detalleRecurso";

const DetalleRecursoContext = createContext();

export const useDetalleRecurso = () => {
  const context = useContext(DetalleRecursoContext);
  if (!context) throw new Error("useDetalleRecursos must be used within a DetalleRecursoProvider");
  return context;
};

export function DetalleRecursoProvider({ children }) {
  const [detalles_recursos, setDetallesRecursos] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getDetallesRecursos = async () => {
    // const res = await getRecursosRequest();
    // setRecursos(res.data);
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getDetallesRecursosRequest(token);
      setDetallesRecursos(res.data);
    } catch (error) {
      console.error('Error fetching Detalles Recursos:', error);
    }
  };

  const createDetalleRecurso = async (recurso) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await createDetalleRecursoRequest(token, recurso);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al crear el Detalle Recurso";
      }
    } catch (error) {
      console.log(error);
    }
  };



  const updateDetalleRecurso = async (detalles_recursos) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      
      const res = await updateDetalleRecursoRequest(token, detalles_recursos);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al editar los Detalles Recursos";
      }


    } catch (error) {
      console.error(error);
    }
  };


  const deleteDetalleRecurso = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await deleteDetalleRecursoRequest(token, id);
      if (res.status == 200) {
        return "";
      } else {
        return "Error al eliminar el Detalle Recurso";
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <DetalleRecursoContext.Provider
      value={{
        detalles_recursos,
        getDetallesRecursos,
        createDetalleRecurso,
        updateDetalleRecurso,
        deleteDetalleRecurso,
      }}
    >
      {children}
    </DetalleRecursoContext.Provider>
  );
}
