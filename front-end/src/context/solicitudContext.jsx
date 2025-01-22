import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getSolicitudesRequest,
  getSolicitudesFilterRequest,
  getSolicitudRequest,
  createSolicitudRequest,
  updateSolicitudRequest,
  deleteSolicitudRequest,
  cambiarEstadoSolicitudRequest,
} from "../api/solicitud";

const SolicitudContext = createContext();

export const useSolicitud = () => {
  const context = useContext(SolicitudContext);
  if (!context) throw new Error("useSolicitud must be used within a solicitudProvider");
  return context;
};

export function SolicitudProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();


  const getSolicitudes = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getSolicitudesRequest(token);
      setSolicitudes(res.data);
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    }
    finally {
      setLoading(false);
    }
  };


  const getSolicitudesFilter = async (filtros) => {

    try {

      setLoading(true);

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getSolicitudesFilterRequest(token, filtros);

      if (res.status === 200) {
        setSolicitudes(res.data);
        // return res.data;
      } else {
        setSolicitudes([]);
        // return [];
      }

    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    }
    finally {
      setLoading(false);
    }
  };


    const getSolicitud = async (id) => {
      try {

        const token = await getAccessTokenSilently({
          audience: 'https://gestion-espacios/api',
        });

        const res = await getSolicitudRequest(token, id);

        if (res.status === 200) {
          return res.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };



  const createSolicitud = async (solicitud) => {
    try {

      setLoading(true);
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await createSolicitudRequest(token, solicitud);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la solicitud";
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };



  const updateSolicitud = async (solicitud) => {
    try {

      setLoading(true);

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const resp = await updateSolicitudRequest(token, solicitud);

      if (resp.status === 200) {
        return "";
      } else {
        return "hubo un error al editar la solicitud";
      }

    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const deleteSolicitud = async (id) => {
    try {

      setLoading(true);

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await deleteSolicitudRequest(token, id);
      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la solicitud";
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };



  const cambiarEstadoSolicitud = async (body) => {
    try {

      setLoading(true);
      
      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await cambiarEstadoSolicitudRequest(token, body);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al aprobar Solicitud";
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <SolicitudContext.Provider
      value={{
        solicitudes,
        loading,
        getSolicitudes,
        getSolicitudesFilter,
        getSolicitud,
        createSolicitud,
        updateSolicitud,
        deleteSolicitud,
        cambiarEstadoSolicitud,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}
