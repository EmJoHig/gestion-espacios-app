import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getRecursosRequest,
  // getRecursoRequest,
  createRecursoRequest,
  updateRecursoRequest,
  deleteRecursoRequest,
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
      const res = await createRecursoRequest(recurso);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateRecurso = async (id, recurso) => {
    try {
      await updateRecursoRequest(id, recurso);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteRecurso = async (id) => {
    try {
      const res = await deleteRecursoRequest(id);
      console.log("response delete minist");
      console.log(res);
      // if (res.status === 204) setRecursos(recursos.filter((recurso) => recurso._id !== id));
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
      }}
    >
      {children}
    </RecursoContext.Provider>
  );
}
