import axios from "./axios";
import { API_URL } from "../config";

export const getRecursosRequest = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/recurso/get_recursos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching recursos:", error);
    throw error;
  }
};

// export const createRecursoRequest = async (recurso) => axios.post("http://localhost:3000/recurso/nuevo_recurso", recurso);
export const createRecursoRequest = async (token, body) => {
  try {
    const response = await axios.post(
      `${API_URL}/recurso/nuevo_recurso`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error createRecurso: ", error);
    throw error;
  }
};

// export const updateRecursoRequest = async (recurso) => axios.put(`http://localhost:3000/recurso/editar_recurso/${recurso.id}`, recurso);
export const updateRecursoRequest = async (token, recurso) => {
  try {
    console.log("Datos de RECURSO enviar al backend:", recurso); // Ver los datos antes de enviarlos

    const response = await axios.patch(
      `${API_URL}/recurso/editar_recurso/${recurso.id}`,
      recurso,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updateRecurso: ", error);
    throw error;
  }
};

export const incrementarDisponibleRequest = async (token, recurso) => {
  try {
    console.log("Datos de RECURSO enviar al backend:", recurso); // Ver los datos antes de enviarlos

    const response = await axios.patch(
      `${API_URL}/recurso/incrementar_disponible/${recurso.id}`,
      recurso,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updateRecurso: ", error);
    throw error;
  }
};

// export const deleteRecursoRequest = async (id) => axios.delete(`http://localhost:3000/recurso/eliminar_recurso/${id}`);
export const deleteRecursoRequest = async (token, id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/recurso/eliminar_recurso/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleteRecurso: ", error);
    throw error;
  }
};
