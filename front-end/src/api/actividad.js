import axios from "./axios";


export const getActividadesRequest = async (token) => {
    try {
      const responseActividades = await axios.get('http://localhost:3000/actividad/get_actividades', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      return responseActividades
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  };


export const createActividadRequest = async (actividad) => axios.post("http://localhost:3000/actividad/nueva_actividad", actividad);

export const updateActividadRequest = async (actividad) => axios.put(`http://localhost:3000/actividad/editar_actividad/${actividad.id}`, actividad);

export const deleteActividadRequest = async (id) => axios.delete(`http://localhost:3000/actividad/eliminar_actividad/${id}`);


