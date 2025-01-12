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
  const { reservas, getReservas, createReserva } = useReserva();
  const { espacios, getEspacios } = useEspacio();
  const { ministerios, getMinisterios, createMinisterio, updateMinisterio } = useMinisterio();
  const { actividades, getActividades } = useActividad();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    // Cuando se cargan los espacios disponibles, seleccionarlos todos por defecto
    if (espaciosDisponibles.length > 0) {
      setEspaciosSeleccionados(espaciosDisponibles);
    }
  }, [espaciosDisponibles]);


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
    setSelectedDate(info.date);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  /*   const buildReservaObject = (data) => {
      const nuevaReserva = {
        ministerioId: data.ministerioId,
        actividadId: data.actividadId,
        espacioId: data.espacioId,
        fecha: data.fecha,
        horaInicio: data.horaInicio,
        horaFin: data.horaFin,
      };
      return nuevaReserva;
    }; */

  const buildReservaObject = (data) => {

    const fechaInicio = dayjs(data.fecha.$d)
      .hour(data.horaInicio.$H)
      .minute(data.horaInicio.$m)
      .second(data.horaInicio.$s)
      .toISOString(); // Convierte a formato ISO

    const fechaFin = dayjs(data.fecha.$d)
      .hour(data.horaFin.$H)
      .minute(data.horaFin.$m)
      .second(data.horaFin.$s)
      .toISOString(); // Convierte a formato ISO

    const reserva = {
      espacioId: data.espacioId,
      ministerioId: data.ministerioId,
      actividadId: data.actividadId,
      fechaInicio,
      fechaFin,
    };

    console.log("Reserva construida:", reserva);
    return reserva;
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

  return (
    <>
      <ReservaDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSaveReserva}
        ministerios={ministerios || []}
        actividades={actividades || []}
        espacios={espacios || []}
        selectedDate={selectedDate}
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
        />
      </Box>

    </>
  );
}
