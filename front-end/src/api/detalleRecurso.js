import axios from "./axios";
import { API_URL } from "../config";

export const getDetallesRecursosRequest = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/detalle_recurso//get_detalles_recursos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching Detalles Recursos:", error);
    throw error;
  }
};

export const createDetalleRecursoRequest = async (token, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/detalle_recurso/nuevo_detalle_recurso`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error createDetalleRecurso: ", error);
    throw error;
  }
};

export const updateDetalleRecursoRequest = async (token, detalle_recurso) => {
  try {
    const response = await axios.put(
      `${API_URL}/detalle_recurso/editar_detalle_recurso:id/${detalle_recurso.id}`,
      detalle_recurso,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updateDetalleRecurso: ", error);
    throw error;
  }
};

export const deleteDetalleRecursoRequest = async (token, id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/detalle_recurso/eliminar_detalle_recurso/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleteDetalleRecurso: ", error);
    throw error;
  }
};
