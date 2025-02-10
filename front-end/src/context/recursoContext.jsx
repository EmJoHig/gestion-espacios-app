import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getRecursosRequest,
  // getRecursoRequest,
  createRecursoRequest,
  updateRecursoRequest,
  deleteRecursoRequest,
  incrementarDisponibleRequest,
} from "../api/recurso";

const RecursoContext = createContext();

export const useRecurso = () => {
  const context = useContext(RecursoContext);
  if (!context) throw new Error("useRecursos must be used within a RecursoProvider");
  return context;
};

export function RecursoProvider({ children }) {
  const [recursos, setRecursos] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getRecursos = async () => {
    // const res = await getRecursosRequest();
    // setRecursos(res.data);
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getRecursosRequest(token);
      setRecursos(res.data);
    } catch (error) {
      console.error('Error fetching recursos:', error);
    }
  };

  //   const getRecurso = async (id) => {
  //     try {
  //       const res = await getRecursoRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const createRecurso = async (recurso) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await createRecursoRequest(token, recurso);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al crear el recurso";
      }
    } catch (error) {
      console.log(error);
    }
  };



  const updateRecurso = async (recurso) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      
      const res = await updateRecursoRequest(token, recurso);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al editar el recurso";
      }


    } catch (error) {
      console.error(error);
    }
  };

  const incrementarDisponible = async (recurso) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      
      const res = await incrementarDisponibleRequest(token, recurso);

      if (res.status == 200) {
        return "";
      } else {
        return "Error al editar el recurso";
      }


    } catch (error) {
      console.error(error);
    }
  };


  const deleteRecurso = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await deleteRecursoRequest(token, id);
      if (res.status == 200) {
        return "";
      } else {
        return "Error al eliminar el recurso";
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <RecursoContext.Provider
      value={{
        recursos,
        getRecursos,
        // getRecurso,
        createRecurso,
        updateRecurso,
        deleteRecurso,
        incrementarDisponible,
      }}
    >
      {children}
    </RecursoContext.Provider>
  );
}
