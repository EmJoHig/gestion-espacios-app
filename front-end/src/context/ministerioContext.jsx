import { createContext, useContext, useState } from "react";
// import {
//   createMinisterioRequest,
//   deleteMinisterioRequest,
//   getMinisteriosRequest,
//   getMinisterioRequest,
//   updateMinisterioRequest,
// } from "../api/ministerios";

const MinisterioContext = createContext();

export const useMinisterio = () => {
  const context = useContext(MinisterioContext);
  if (!context) throw new Error("useMinisterios must be used within a MinisterioProvider");
  return context;
};

export function MinisterioProvider({ children }) {
  const [ministerios, setMinisterios] = useState([]);

  const getMinisterios = async () => {
    // const res = await getMinisteriosRequest();
    const res = {
      data: [
        { codigo: "1", descripcion: "Ministerio de Educacion" },
        { codigo: "2", descripcion: "Ministerio de Salud" },
        { codigo: "3", descripcion: "Ministerio de Agricultura" },
        { codigo: "4", descripcion: "Ministerio de Defensa" },
        { codigo: "5", descripcion: "Ministerio de Economia" },
      ],
    };
    console.log(res.data);
    setMinisterios(res.data);
    console.log('ministerios');
    console.log(ministerios);

  };

//   const deleteMinisterio = async (id) => {
//     try {
//       const res = await deleteMinisterioRequest(id);
//       if (res.status === 204) setMinisterios(ministerios.filter((ministerio) => ministerio._id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const createMinisterio = async (ministerio) => {
//     try {
//       const res = await createMinisterioRequest(ministerio);
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMinisterio = async (id) => {
//     try {
//       const res = await getMinisterioRequest(id);
//       return res.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateMinisterio = async (id, ministerio) => {
//     try {
//       await updateMinisterioRequest(id, mMinisterio);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <MinisterioContext.Provider
      value={{
        ministerios,
        getMinisterios,
        // deleteMinisterio,
        // createMinisterio,
        // getMinisterio,
        // updateMinisterio,
      }}
    >
      {children}
    </MinisterioContext.Provider>
  );
}
