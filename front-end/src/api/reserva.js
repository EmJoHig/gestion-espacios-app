import axios from "./axios";


export const getReservasRequest = async (token) => {
    try {
      const responseReservas = await axios.get('http://localhost:3000/reserva/get_reservas', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

          // Mapear los datos a un formato compatible con FullCalendar
      const eventosMapped = responseReservas.data.map((reserva) => ({
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



export const createReservaRequest = async (reserva) => axios.post("http://localhost:3000/reserva/nueva_reserva", reserva);

export const updateReservaRequest = async (reserva) => axios.put(`http://localhost:3000/reserva/editar_reserva/${reserva.id}`, reserva);

export const deleteReservaRequest = async (id) => axios.delete(`http://localhost:3000/reserva/eliminar_reserva/${id}`);


