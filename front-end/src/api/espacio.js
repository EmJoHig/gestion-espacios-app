import axios from "./axios";
import { API_URL } from "../config";



export const getEspaciosRequest = async (token) => {
    try {
      const responseEspacios = await axios.get(`${API_URL}/espacio/get_espacios`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      console.log("espacio: ", responseEspacios)
      return responseEspacios
    } catch (error) {
      console.error('Error al obtener los espacios:', error);
    }
  };


export const createEspacioRequest = async (espacio) => axios.post(`${API_URL}/espacio/nuevo_espacio`, espacio);

export const updateEspacioRequest = async (espacio) => axios.put(`${API_URL}/espacio/editar_espacio/${espacio.id}`, espacio);

export const deleteEspacioRequest = async (id) => axios.delete(`${API_URL}/espacio/eliminar_espacio/${id}`);


