import axios from "./axios";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
import { API_URL } from "../config";



export const getSolicitudesRequest = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/solicitud/get_solicitudes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error) {
        console.error('Error getSolicitudesRequest:', error);
        throw error;
    }
};

export const getSolicitudesFilterRequest = async (token, filtros) => {

    const queryParams = new URLSearchParams(filtros).toString(); 

    try {
        const response = await axios.get(`${API_URL}/solicitud/get_solicitudes_filter?${queryParams}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await delay(1000);

        return response;

    } catch (error) {
        console.error('Error fetching solicituds:', error);
        throw error;
    }
};


export const getSolicitudRequest = async (token, id) => {
    try {
      const response = await axios.get(`${API_URL}/solicitud/get_solicitud/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      return response;

    } catch (error) {
      console.error('Error al obtener la reserva:', error);
    }
  };

export const createSolicitudRequest = async (token, body) => {

    try {
        const response = await axios.post(`${API_URL}/solicitud/nueva_solicitud`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error createSolicitudRequest: ', error);
        throw error;
    }
}


export const updateSolicitudRequest = async (token, solicitud) => {
    console.log('llega el body', solicitud);

    try {
        const response = await axios.put(`${API_URL}/solicitud/editar_solicitud/${solicitud.id}`, solicitud, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error updateSolicitudRequest: ', error);
        throw error;
    }
};

export const deleteSolicitudRequest = async (token, id) => {

    try {
        const response = await axios.delete(`${API_URL}/solicitud/eliminar_solicitud/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error deletesolicitudRequest: ', error);
        throw error;
    }
};


export const cambiarEstadoSolicitudRequest = async (token, body) => {

    try {
        const response = await axios.post(`${API_URL}/solicitud/cambiar_estado_solicitud`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        await delay(2000);
        return response;
    } catch (error) {
        console.error('Error cambiarEstadoSolicitudRequest: ', error);
        throw error;
    }
}

