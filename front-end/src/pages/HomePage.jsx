import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useReserva } from "../context/reservaContext";
import { useEspacio } from "../context/espacioContext";
import { useMinisterio } from "../context/ministerioContext.jsx";
import { useActividad } from "../context/actividadContext.jsx";
import ReservaDialog from '../components/ReservaDialog';
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";

export function HomePage() {

  const [eventos, setEventos] = useState([]);
  const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
  const [espaciosSeleccionados, setEspaciosSeleccionados] = useState([]);
  const { reservas, reserva, getReserva,  getReservas, createReserva, updateReserva } = useReserva();
  const { espacios, getEspacios } = useEspacio();
  const { ministerios, getMinisterios, createMinisterio, updateMinisterio } = useMinisterio();
  const { actividades, getActividades } = useActividad();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const { user } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    getEspacios();
    getActividades();
    getMinisterios();
    getReservas();

  }, []);

  useEffect(() => {
    setEventos(reservas)
    setEspaciosDisponibles(espacios.map((espacio) => espacio.nombre))
  }, [reservas, espacios]);

  console.log(reservas)
  
  useEffect(() => {
    // Cuando se cargan los espacios disponibles, seleccionarlos todos por defecto
    if (espaciosDisponibles.length > 0) {
      setEspaciosSeleccionados(espaciosDisponibles);
    }
  }, [espaciosDisponibles]);

  useEffect(() => {
    setSelectedDate(reserva)
}, [reserva]);


  // modulos
  const modulos = [
    { codigo: "2", descripcion: "RESERVAS", ruta: "/reservas", rolesPermitidos: ["ADMIN", "RESPONSABLE"] },
    { codigo: "3", descripcion: "ESPACIOS", ruta: "/espacio", rolesPermitidos: ["ADMIN"] },
    { codigo: "4", descripcion: "RECURSOS", ruta: "/recurso", rolesPermitidos: ["ADMIN"] },
    { codigo: "5", descripcion: "SOLICITUDES DE RESERVA", ruta: "/solicitudes-reservas", rolesPermitidos: ["ADMIN", "RESPONSABLE"] },
    { codigo: "6", descripcion: "MINISTERIOS", ruta: "/ministerio", rolesPermitidos: ["ADMIN"] },
    { codigo: "7", descripcion: "ACTIVIDADES", ruta: "/actividad", rolesPermitidos: ["ADMIN"] },
    { codigo: "8", descripcion: "ROLES", ruta: "/rol", rolesPermitidos: ["ADMIN"] },
    { codigo: "9", descripcion: "USUARIOS", ruta: "/usuarios", rolesPermitidos: ["ADMIN"] },
  ];

  const modulosFiltrados = modulos.filter((modulo) => {
    if (modulo.rolesPermitidos) {
      return modulo.rolesPermitidos.some((rol) =>
        user["https://gestion-espacios/roles"]?.includes(rol)
      );
    }
    return true;
  });



  const [age, setAge] = React.useState('');

  const ChangeSelectMuni = (event) => {
    setAge(event.target.value);
  };




  const eventosFiltrados = eventos.filter((evento) =>
    espaciosSeleccionados.includes(evento.title.split(" - ")[1])
  );

  // Manejar el cambio en el filtro de espacios
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEspaciosSeleccionados(
      typeof value === "string" ? value.split(",") : value
    );
  };


  const handleClick = (property) => () => {
    const ruta = property;
    navigate(ruta);
  };


  const handleDateClick = (info) => {
    const fechaInicio = new Date(info.date); // Crear una nueva fecha basada en info.date
    fechaInicio.setHours(10, 0, 0, 0); // Ajustar el horario a 12:00 AM
  
    const fechaFin = new Date(fechaInicio); // Clonar fechaInicio
    fechaFin.setHours(fechaInicio.getHours() + 1); // Sumar una hora para el final
  
    // Crear el objeto reserva
    const reserva = {
      id: null, // Puedes asignar null si es una nueva reserva
      espacioId: null, // Define el espacioId según tu lógica
      ministerioId: null, // Define el ministerioId según tu lógica
      actividadId: null, // Define la actividadId según tu lógica
      fechaInicio: fechaInicio.toISOString(), // Convertir a formato ISO
      fechaFin: fechaFin.toISOString(), // Convertir a formato ISO
    };
  
    console.log("Nueva reserva: ", reserva); // Para verificar el objeto creado
  
    setSelectedDate(reserva); // Actualizar el estado con la nueva reserva
    setOpenDialog(true); // Abrir el diálogo
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setErrorMessage('')
  };


  const buildReservaObject = (data) => {


    const reserva = {
        id: data.id,
        espacioId: data.espacioId,
        ministerioId: data.ministerioId,
        actividadId: data.actividadId,
        fechaInicio: data.fechaHoraInicio,
        fechaFin: data.fechaHoraFin,
    };

    console.log("Reserva construida:", reserva);
    return reserva;
};

console.log("isE :", isEditing)

const handleSaveOrUpdateReserva = (reserva) => {
  console.log("es actualización: ",isEditing)
  if (isEditing) {
    handleUpdateReserva(reserva);
  } else {
    handleSaveReserva(reserva);
  }
};
  
  const handleSaveReserva = async (reservaData) => {

    const nuevaReserva = buildReservaObject(reservaData);
    try {
      const res = await createReserva(nuevaReserva); // Asume que tienes la función `createReserva`
      if (!res.success) {
        setErrorMessage(res.message || "No se pudo crear la reserva. Intente nuevamente.");
      } else {
        await getReservas(); // Refrescar las reservas después de guardar
        setOpenDialog(false); // Cerrar el diálogo
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleUpdateReserva = async (reservaData) => {
    try {
        console.log("reservaData: ", reservaData)
        const updatedReserva = buildReservaObject(reservaData);
        //console.log("aca: ",updateReserva)
        const res = await updateReserva(updatedReserva); // Suponiendo que tienes una función updateReserva
        console.log("res", res)
        if (!res.success) {
            setErrorMessage(res.message || "No se pudo actualizar la reserva. Intente nuevamente.");
        } else {
            await getReservas(); // Refrescar las reservas
            setOpenDialog(false); // Cerrar el diálogo
        }
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
    }
};

  const handleEventClick = (info) => {
    const selectedReserva = reservas.find((res) => res.id === parseInt(info.event.id));
    getReserva(parseInt(info.event.id));
    if (selectedReserva) {
        setSelectedDate(selectedReserva);
        setIsEditing(true);
        setOpenDialog(true);
    }
  };

  return (
    <>
      <ReservaDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSaveOrUpdateReserva}
        ministerios={ministerios || []}
        actividades={actividades || []}
        espacios={espacios || []}
        selectedDate={selectedDate}
        isEditing={isEditing}
        errorMessage={errorMessage}
      />
      <Box sx={{ flexGrow: 1, marginTop: '20px' }}>

        <Typography gutterBottom variant="h5" component="div">
          Modulos
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


          {/* {usuario.modulos.length === 0 && (
            <h1>no hay modulos</h1>
          )}

          {usuario.modulos.map((modulo) => (
            <Grid item xs={3} key={modulo.codigo}>
              <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(modulo.ruta)}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {modulo.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))} */}

          {modulosFiltrados.map((modulo) => (
            // <Grid item xs={3} key={modulo.codigo}>
            //   <Card
            //     sx={{ maxWidth: "100%", textAlign: "center", backgroundColor: "#90caf9" }}
            //     onClick={handleClick(modulo.ruta)}
            //   >
            //     <CardActionArea>
            //       <CardContent>
            //         <Typography gutterBottom variant="h6" component="div">
            //           {modulo.descripcion}
            //         </Typography>
            //       </CardContent>
            //     </CardActionArea>
            //   </Card>
            // </Grid>


            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={modulo.codigo}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  textAlign: "center",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
                onClick={handleClick(modulo.ruta)}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      p: 3,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "16px", sm: "18px", md: "20px" },
                      }}
                    >
                      {modulo.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}


        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginTop: '50px', marginBottom: '100px' }}>
        <Typography gutterBottom variant="h5">
          Calendario de Reservas
        </Typography>

        {/* Select para filtrar espacios */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Espacios</InputLabel>
          <Select
            multiple
            value={espaciosSeleccionados}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {espaciosDisponibles.map((espacio) => (
              <MenuItem key={espacio} value={espacio}>
                <Checkbox checked={espaciosSeleccionados.includes(espacio)} />
                <ListItemText primary={espacio} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={eventosFiltrados}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </Box>

    </>
  );
}
