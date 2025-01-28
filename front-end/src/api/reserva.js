import axios from "./axios";
import { API_URL } from "../config";




export const getReservasRequest = async (token) => {
    try {
      const responseReservas = await axios.get(`${API_URL}/reserva/get_reservas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

          // Mapear los datos a un formato compatible con FullCalendar
      const eventosMapped = responseReservas.data.map((reserva) => ({
        id: reserva.id,
        title: `${reserva.Actividad.nombre} - ${reserva.Espacio.nombre} - ${reserva.Ministerio.codigo}`, // Título del evento
        start: reserva.fechaInicio, // Fecha de inicio
        end: reserva.fechaFin, // Fecha de fin
        color: colorMapping[reserva.Espacio.nombre] || '#000', // Asignar un color según el espacio
      }));
      return eventosMapped
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

    // Mapeo de colores para cada espacio
    const colorMapping = {
      "Aula 1": "#1E90FF",
      "Aula 2": "#32CD32",
      "Aula 3": "#FFD700",
      "Salón Principal": "#FF4500",
      "Cocina": "#8A2BE2"
    };



    export const getReservaRequest = async (token, id) => {
      try {
        const reserva = await axios.get(`${API_URL}/reserva/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
        });
        return reserva.data
      } catch (error) {
        console.error('Error al obtener la reserva:', error);
      }
    };

export const createReservaRequest = async (reserva) => {
  try {
      const response = await axios.post(`${API_URL}/reserva/nueva_reserva`, reserva);
      return {
        success: true,
        message: response.data
      }
  } catch (error) {
      // Manejo del error
      if (error.response) {
          // Error de respuesta del servidor
          return {
              success: false,
              message: error.response.data.message || 'Error al crear la reserva.',
          };
      } else {
          // Otro tipo de error (network, etc.)
          return {
              success: false,
              message: 'Error de conexión. Por favor, inténtalo más tarde.',
          };
      }
  }
};

export const updateReservaRequest = async (reserva) => {
  try {
    const response = await axios.put(`${API_URL}/reserva/editar_reserva/${reserva.id}`, reserva);
    console.log("reponse: ", response)
    return {
      success: true,
      message: response.data
    }
  }catch (error) {
    // Manejo del error
    if (error.response) {
        // Error de respuesta del servidor
        return {
            success: false,
            message: error.response.data.message || 'Error al actualizar la reserva.',
        };
    } else {
        // Otro tipo de error (network, etc.)
        return {
            success: false,
            message: 'Error de conexión. Por favor, inténtalo más tarde.',
        };
    }
  }
};

export const deleteReservaRequest = async (id) => axios.delete(`${API_URL}/reserva/eliminar_reserva/${id}`);
