import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getReservasRequest,
  getReservaRequest,
  createReservaRequest,
  updateReservaRequest,
  deleteReservaRequest,
} from "../api/reserva.js";

const ReservaContext = createContext();

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) throw new Error("useMinisterios must be used within a ReservaProvider");
  return context;
};

export function ReservaProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [reserva, setReserva] = useState([]);


  const getReservas = async () => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getReservasRequest(token);
      setReservas(res);
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };

  const getReserva = async (id) => {
    try {
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });
      const res = await getReservaRequest(token, id);
      setReserva(res);
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };



  const createReserva = async (reserva) => {
    try {
      const res = await createReservaRequest(reserva);
      console.log("context: ",res);
      return res
    } catch (error) {
      console.log(error);
      return error
    }
  };



  const updateReserva = async (id, reserva) => {
    try {
      await updateReservaRequest(id, reserva);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteReserva = async (id) => {
    try {
      const res = await deleteReservaRequest(id);
      console.log("response delete minist");
      console.log(res);
      // if (res.status === 204) setMinisterios(ministerios.filter((ministerio) => ministerio._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ReservaContext.Provider
      value={{
        reservas,
        reserva,
        getReservas,
        getReserva,
        createReserva,
        updateReserva,
        deleteReserva,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}
