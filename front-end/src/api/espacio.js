import axios from "./axios";


export const getEspaciosRequest = async (token) => {
  try {
    const responseEspacios = await axios.get('http://localhost:3000/espacio/get_espacios', {
      /*         headers: {
                  Authorization: `Bearer ${token}`,
              }, */
    });
    // console.log("espacio: ", responseEspacios)
    return responseEspacios
  } catch (error) {
    console.error('Error al obtener los espacios:', error);
  }
};

export const getEspacioRequest = async (token, id) => {
  try {
    const response = await axios.get(`http://localhost:3000/espacio/get_espacio/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;

  } catch (error) {
    console.error('Error al obtener el espacio:', error);
  }
};


export const createEspacioRequest = async (espacio) => axios.post("http://localhost:3000/espacio/nuevo_espacio", espacio);

export const updateEspacioRequest = async (espacio) => axios.put(`http://localhost:3000/espacio/editar_espacio/${espacio.id}`, espacio);

export const deleteEspacioRequest = async (id) => axios.delete(`http://localhost:3000/espacio/eliminar_espacio/${id}`);



export const getTiposEspacioRequest = async (token) => {
  try {
      const response = await axios.get("http://localhost:3000/espacio/get_tipos_espacio", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return response;
  } catch (error) {
      console.error('Error getTiposEspacioRequest:', error);
      throw error;
  }
};


