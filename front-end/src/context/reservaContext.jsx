import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getReservasRequest,
  getReservaRequest,
  createReservaRequest,
  updateReservaRequest,
  deleteReservaRequest,
  getReservasFilterRequest,
  bajaReservaRequest,
  validarAulasDisponiblesRequest
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
  const [loading, setLoading] = useState(false);


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
      return res;
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };



  const createReserva = async (reserva) => {
    try {
      const res = await createReservaRequest(reserva);
      // console.log("context: ",res);
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  };



  const updateReserva = async (reserva) => {
    console.log("reserva: ", reserva)
    try {
      const res = await updateReservaRequest(reserva);
      console.log("context: ", res)
      return res
    } catch (error) {
      console.error("er", error);
      return error
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



  const getReservasFilter = async (filtros) => {

    try {

      setLoading(true);

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getReservasFilterRequest(token, filtros);

      if (res.status === 200) {
        // setSolicitudes(res.data);
        return res.data;
      } else {
        // setSolicitudes([]);
        return null;
      }

    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    }
    finally {
      setLoading(false);
    }
  };


  const bajaReserva = async (body) => {
    try {

      setLoading(true);

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await bajaReservaRequest(token, body);

      if (res.status === 200) {
        return "";
      } else {
        return "Hubo un error al dar de baja la reserva";
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };


  const validarAulasDisponibles = async (body) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await validarAulasDisponiblesRequest(token, body);

      if (res.status === 200) {
        return res.data.result;
      } else {
        return false;
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <ReservaContext.Provider
      value={{
        reservas,
        reserva,
        loading,
        getReservas,
        getReserva,
        createReserva,
        updateReserva,
        deleteReserva,
        getReservasFilter,
        bajaReserva,
        validarAulasDisponibles
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}
