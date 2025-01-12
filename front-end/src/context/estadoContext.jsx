import { createContext, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {getEstadosRequest} from "../api/estado.js";

const EstadoContext = createContext();

export const useEstado = () => {
  const context = useContext(EstadoContext);
  if (!context) throw new Error("useEstado must be used within a EstadoProvider");
  return context;
};

export function EstadoProvider({ children }) {
  const [estados, setEstados] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getEstados = async () => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getEstadosRequest(token);
      //const espacios = res.data.map((espacio) => espacio.nombre);
      setEstados(res.data);
    } catch (error) {
      console.error('Error fetching estados:', error);
    }
  };

  return (
    <EstadoContext.Provider
      value={{
        estados,
        getEstados,
      }}
    >
      {children}
    </EstadoContext.Provider>
  );
}