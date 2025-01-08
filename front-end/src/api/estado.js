import axios from "axios";

export const getEstadosRequest = async (token) => {
  try {
    const responseEstados = await axios.get(
      "http://localhost:3000/estado/get_estados",
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
