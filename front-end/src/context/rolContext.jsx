import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getRolesRequest,
  // getRolRequest,
  createRolRequest,
  updateRolRequest,
  deleteRolRequest,
} from "../api/rol";

const RolContext = createContext();

export const useRol = () => {
  const context = useContext(RolContext);
  if (!context) throw new Error("useRoles must be used within a RolProvider");
  return context;
};

export function RolProvider({ children }) {
  const [rols, setRoles] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getRoles = async () => {
    // const res = await getRolsRequest();
    // setRols(res.data);
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getRolesRequest(token);
      setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  //   const getRol = async (id) => {
  //     try {
  //       const res = await getRolRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const createRol = async (rol) => {
    try {
      const res = await createRolRequest(rol);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const updateRol = async (id, rol) => {
    try {
      await updateRolRequest(id, rol);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteRol = async (id) => {
    try {
      const res = await deleteRolRequest(id);
      console.log("response delete rol");
      console.log(res);
      // if (res.status === 204) setRols(rols.filter((rol) => rol._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <RolContext.Provider
      value={{
        rols,
        getRoles,
        // getRol,
        createRol,
        updateRol,
        deleteRol,
      }}
    >
      {children}
    </RolContext.Provider>
  );
}
