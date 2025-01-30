import axios from "axios";
import { API_URL } from "../config";


export const getEstadosRequest = async (token) => {
  try {
    const responseEstados = await axios.get(
      `${API_URL}/estado/get_estados`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseEstados;
  } catch (error) {
    console.error("Error al obtener los estados: ", error);
  }
};
