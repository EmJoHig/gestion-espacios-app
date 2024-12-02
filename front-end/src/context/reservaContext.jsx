import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getReservasRequest,
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


  const createReserva = async (reserva) => {
    try {
      const res = await createReservaRequest(reserva);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
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
        getReservas,
        createReserva,
        updateReserva,
        deleteReserva,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}
