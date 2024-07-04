import { createContext, useContext, useState } from "react";
import {
  createUsuarioRequest,
  deleteUsuarioRequest,
  getUsuariosRequest,
  getUsuarioRequest,
  updateUsuarioRequest,
} from "../api/usuario";

const UsuarioContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuarios must be used within a UsuarioProvider");
  return context;
};

export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {

    try {
      const res = await getUsuariosRequest();
      console.log("res.data");
      console.log(res.data);
      setUsuarios(res.data);
      return res.data;

  } catch (error) {
      console.error('Error fetching usuarios:', error);
      return []; // o cualquier valor por defecto apropiado
  }

  };

  const deleteUsuario = async (id) => {
    try {
      const res = await deleteUsuarioRequest(id);
      if (res.status === 204) setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createUsuario = async (usuario) => {
    try {
      const res = await createUsuarioRequest(usuario);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async (id) => {
    try {
      const res = await getUsuarioRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsuario = async (id, usuario) => {
    try {
      await updateUsuarioRequest(id, usuario);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        getUsuarios,
        deleteUsuario,
        createUsuario,
        getUsuario,
        updateUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
