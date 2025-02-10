import axios from "./axios";
import { API_URL } from "../config";

export const getEspaciosRequest = async (token) => {
  try {
    const responseEspacios = await axios.get(
      `${API_URL}/espacio/get_espacios`,
      {
        /*         headers: {
                  Authorization: `Bearer ${token}`,
              }, */
      }
    );
    // console.log("espacio: ", responseEspacios)
    return responseEspacios;
  } catch (error) {
    console.error("Error al obtener los espacios:", error);
  }
};

export const getEspacioRequest = async (token, id) => {
  try {
    const response = await axios.get(`${API_URL}/espacio/get_espacio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al obtener el espacio:", error);
  }
};

export const createEspacioRequest = async (espacio) =>
  axios.post(`${API_URL}/espacio/nuevo_espacio`, espacio);

export const updateEspacioRequest = async (espacio) =>
  axios.put(`${API_URL}/espacio/editar_espacio/${espacio.id}`, espacio);

export const deleteEspacioRequest = async (id) =>
  axios.delete(`${API_URL}/espacio/eliminar_espacio/${id}`);

export const getTiposEspacioRequest = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/espacio/get_tipos_espacio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error getTiposEspacioRequest:", error);
    throw error;
  }
};

export const getDetallesRecursosRequest = async (token, id) => {
  try {
    const response = await axios.get(
      `${API_URL}/espacio/get_detalles_recursos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error al obtener los detalles recursos del espacio:", error);
  }
};
