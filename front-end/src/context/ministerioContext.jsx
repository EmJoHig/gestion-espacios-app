import { createContext, useContext, useState } from "react";
import {
  getMinisteriosRequest,
  // getMinisterioRequest,
  createMinisterioRequest,
  updateMinisterioRequest,
  deleteMinisterioRequest,
} from "../api/ministerio";

const MinisterioContext = createContext();

export const useMinisterio = () => {
  const context = useContext(MinisterioContext);
  if (!context) throw new Error("useMinisterios must be used within a MinisterioProvider");
  return context;
};

export function MinisterioProvider({ children }) {
  const [ministerios, setMinisterios] = useState([]);

  const getMinisterios = async () => {
    const res = await getMinisteriosRequest();
    // console.log("GET MINISTERIOS");
    setMinisterios(res.data);
    // console.log(ministerios);
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


  return (
    <MinisterioContext.Provider
      value={{
        ministerios,
        getMinisterios,
        // getMinisterio,
        createMinisterio,
        updateMinisterio,
        deleteMinisterio,
      }}
    >
      {children}
    </MinisterioContext.Provider>
  );
}
