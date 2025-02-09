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
  Icon,
} from "@mui/material";
import Container from '@mui/material/Container';
import {
  EventNote, // for RESERVAS
  Room, // for ESPACIOS
  Inventory, // for RECURSOS
  AssignmentTurnedIn, // for SOLICITUDES DE RESERVA
  Group, // for MINISTERIOS
  Event, // for ACTIVIDADES
  Security, // for ROLES
  People, // for USUARIOS
} from "@mui/icons-material";
import { styled, alpha } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import './styles.css';

import { useReserva } from "../context/reservaContext";
import { useEspacio } from "../context/espacioContext";
import { useMinisterio } from "../context/ministerioContext.jsx";
import { useActividad } from "../context/actividadContext.jsx";
import { useSolicitud } from "../context/solicitudContext";
import { useUsuario } from "../context/usuarioContext";
import ReservaDialog from '../components/ReservaDialog';
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";

export function HomePage() {

  const [eventos, setEventos] = useState([]);
  const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
  const [espaciosSeleccionados, setEspaciosSeleccionados] = useState([]);
  const { reservas, reserva, getReserva, getReservas, createReserva, updateReserva } = useReserva();
  const { espacios, getEspacios, getEspacio } = useEspacio();
  const { ministerios, getMinisterios, createMinisterio, updateMinisterio } = useMinisterio();
  const { actividades, getActividades } = useActividad();
  const { createSolicitud } = useSolicitud();
  const { getUserByIdAUTH0 } = useUsuario();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [ rolUsuarioBD, setRolUsuarioBD ] = useState("");
  const [ minUsuario, setMinUsuario ] = useState("");
  const [modulosFiltrados, setModulosFiltrados] = useState([]);
  const [ minSelect, setMinSelect ] = useState("");

  const [dialogOrigin, setDialogOrigin] = useState(null); // 'C' (calendario)' , 'B' (boton)


  //snackbar
  const [snackBarState, setSnackBarState] = React.useState({
    open: false,
    message: '',
    severity: 'success', // Puede ser 'success', 'error', 'info', 'warning'
  });
  const openSnackBar = (message, severity) => {
    setSnackBarState({
      open: true,
      message,
      severity,
    });
  };
  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState({ ...snackBarState, open: false });
  };
  //snackbar

  const { user } = useAuth0();

  const navigate = useNavigate();


  const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[3],
    },
  }))


  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };


  const IconWrapper = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(0.25),
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  }))

  const getIcon = (codigo) => {
    switch (codigo) {
      case "3":
        return <Room />
      case "4":
        return <Inventory />
      case "5":
        return <AssignmentTurnedIn />
      case "6":
        return <Group />
      case "7":
        return <Event />
      case "8":
        return <Security />
      case "9":
        return <People />
      default:
        return <EventNote />
    }
  }

  // modulos
  const modulos = [
    { codigo: "1", descripcion: "RESERVAS", ruta: "/reservas", rolesPermitidos: ["ADMIN"] },
    { codigo: "3", descripcion: "ESPACIOS", ruta: "/espacio", rolesPermitidos: ["ADMIN"] },
    { codigo: "4", descripcion: "RECURSOS", ruta: "/recurso", rolesPermitidos: ["ADMIN"] },
    { codigo: "5", descripcion: "SOLICITUDES DE RESERVA", ruta: "/solicitudes-reservas", rolesPermitidos: ["ADMIN", "RESPONSABLE"] },
    { codigo: "2", descripcion: "MINISTERIOS", ruta: "/ministerio", rolesPermitidos: ["ADMIN"] },
    { codigo: "7", descripcion: "ACTIVIDADES", ruta: "/actividad", rolesPermitidos: ["ADMIN"] },
    { codigo: "8", descripcion: "ROLES", ruta: "/rol", rolesPermitidos: ["ADMIN"] },
    { codigo: "9", descripcion: "USUARIOS", ruta: "/usuarios", rolesPermitidos: ["ADMIN"] },
  ];


  useEffect(() => {
    getEspacios();
    // getActividades();
    getMinisterios();
    getReservas();

    if (user) {
      const id = user.sub;
      const fetchGetUserPorAUTH0id = async () => {
        try {
          const usuario = await getUserByIdAUTH0(id);
          console.log("usuario: ", usuario);
          // console.log("userMin: ",usuario.ministerioId)
          setMinUsuario(usuario.ministerioId);

          const rolUserBD = usuario?.rol?.name || "";
          setRolUsuarioBD(rolUserBD);

          setModulosFiltrados(modulos.filter((modulo) => {
            if (modulo.rolesPermitidos) {
              return usuario?.rol?.name
                ? modulo.rolesPermitidos.some((rol) => usuario.rol.name.includes(rol))
                : false;
            }
            return true;
          }));

          // gets
          await getActividades();

        } catch (error) {
          console.error("Error fetching tipos de espacio:", error);
        }
      };
      fetchGetUserPorAUTH0id();
    }

  }, []);

  useEffect(() => {
    setEventos(reservas)
    setEspaciosDisponibles(espacios.map((espacio) => espacio.nombre))
  }, [reservas, espacios]);

  // console.log(reservas)

  useEffect(() => {
    // Cuando se cargan los espacios disponibles, seleccionarlos todos por defecto
    if (espaciosDisponibles.length > 0) {
      setEspaciosSeleccionados(espaciosDisponibles);
    }
  }, [espaciosDisponibles]);

  useEffect(() => {
    setSelectedDate(reserva)
    setMinSelect(reserva.ministerioId)
  }, [reserva]);




  // const modulosFiltrados = modulos.filter((modulo) => {
  //   if (modulo.rolesPermitidos) {
  //     return modulo.rolesPermitidos.some((rol) =>
  //       user["https://gestion-espacios/roles"]?.includes(rol)
  //     );
  //   }
  //   return true;
  // });



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
    setDialogOrigin('C');
    const fechaInicio = new Date(info.date); // Crear una nueva fecha basada en info.date
    fechaInicio.setHours(10, 0, 0, 0); // Ajustar el horario a 12:00 AM

    const fechaFin = new Date(fechaInicio); // Clonar fechaInicio
    fechaFin.setHours(fechaInicio.getHours() + 1); // Sumar una hora para el final

    // Crear el objeto reserva
    const reserva = {
      id: null, // Puedes asignar null si es una nueva reserva
      espacioId: null, // Define el espacioId según tu lógica
      ministerioId: minUsuario, // Define el ministerioId según tu lógica
      actividadId: null, // Define la actividadId según tu lógica
      fechaInicio: fechaInicio.toISOString(), // Convertir a formato ISO
      fechaFin: fechaFin.toISOString(), // Convertir a formato ISO
    };

    console.log("rolUsuarioBD: ", rolUsuarioBD); // Para verificar el objeto creado

    setSelectedDate(reserva); // Actualizar el estado con la nueva reserva
    if(rolUsuarioBD !== "CONSULTA")
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

    // console.log("Reserva construida:", reserva);
    return reserva;
  };

  // console.log("isE :", isEditing)

  const handleSaveOrUpdateReserva = (reserva) => {
    // console.log("es actualización: ",isEditing)
    if (isEditing) {
      handleUpdateReserva(reserva);
    } else {
      handleSaveReserva(reserva);
    }
  };

  const handleSaveReserva = async (reservaData) => {

    const nuevaReserva = buildReservaObject(reservaData);
    try {

      //primero chequeo que al guardar, el espacio sea tipo AULA, si es asi, guardo la reserva, sino SOLICITUD

      const respGetEspacio = await getEspacio(nuevaReserva.espacioId);

      // SI EL ESPACIO ES DE TIPO AULA, CREO DIRECTO LA RESERVA
      if (respGetEspacio && respGetEspacio.tipoEspacio.nombre === "AULA" || rolUsuarioBD == "ADMIN") {

        const res = await createReserva(nuevaReserva); // Asume que tienes la función `createReserva`
        if (!res.success) {
          //setErrorMessage(res.message || "No se pudo crear la reserva. Intente nuevamente.");
          openSnackBar(res.message, 'error');
        } else {
          openSnackBar('Se creó la RESERVA con exito.', 'success');
          await getReservas(); // Refrescar las reservas después de guardar
          setOpenDialog(false); // Cerrar el diálogo
        }
      } else {
        // SINO, CREO UNA SOLICITUD DE RESERVA
        const nuevaSolicitud = {
          id: null,
          espacioId: nuevaReserva.espacioId,
          ministerioId: nuevaReserva.ministerioId,
          actividadId: nuevaReserva.actividadId,
          fechaInicio: nuevaReserva.fechaInicio,
          fechaFin: nuevaReserva.fechaFin,
        };

        const res = await createSolicitud(nuevaSolicitud);

        if (res == "") {
          openSnackBar('Se creó la SOLICITUD de RESERVA con exito.', 'success');
          await getReservas();
          setOpenDialog(false);
        } else {
          setErrorMessage(res.message || "No se pudo crear la solicitud. Intente nuevamente.");
        }
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleUpdateReserva = async (reservaData) => {
    try {
      const respGetEspacio = await getEspacio(reservaData.espacioId);

      if (respGetEspacio && respGetEspacio.tipoEspacio.nombre === "AULA" || rolUsuarioBD == "ADMIN") {


      // console.log("reservaData: ", reservaData)
      const updatedReserva = buildReservaObject(reservaData);
      //console.log("aca: ",updateReserva)
      const res = await updateReserva(updatedReserva); // Suponiendo que tienes una función updateReserva
      console.log("res", res)
      if (!res.success) {
        openSnackBar('No se pudo actualizar la reserva. Intente nuevamente', 'error');
      } else {
        openSnackBar('Se actualizo la RESERVA con exito.', 'success');
        await getReservas(); // Refrescar las reservas
        setOpenDialog(false); // Cerrar el diálogo

      }
    } else {
      openSnackBar('No se puede actualizar por un espacio que no sea Aula', 'error');
    }
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
    }
  };

  const handleEventClick = async (info) => {
    console.log("handleEventClick rolUsuarioBD: ", rolUsuarioBD); 

    const selectedReserva = reservas.find((res) => res.id === parseInt(info.event.id));
    console.log(":",reservas.find((res) => res.id === parseInt(info.event.id)))
    const reservaSelect = await getReserva(parseInt(info.event.id));
    if (selectedReserva) {
      if(reservaSelect.ministerioId == minUsuario || rolUsuarioBD == "ADMIN"){
        setSelectedDate(selectedReserva);
        setIsEditing(true);
        setOpenDialog(true);
        } else{
          openSnackBar('No se pudo editar reservas de otros Ministerios.', 'error');
        }
    }
  };

  return (
    <>
      <Container fixed>
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
          rolUsuarioBD={rolUsuarioBD}
          dialogOrigin={dialogOrigin}
          ministerioUser = {minUsuario}
        />
        <Box sx={{ flexGrow: 1, margin: "20px 0" }}>
          <Grid container spacing={2}>
            {modulosFiltrados.map((modulo) => (
              <Grid item xs={4} sm={3} md={2} lg={1.5} key={modulo.codigo}>
                <StyledCard onClick={handleClick(modulo.ruta)}>
                  <CardActionArea>
                    <CardContent sx={{ padding: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Icon sx={{ fontSize: { xs: "3rem", sm: "3rem", md: "3rem" } }}> {/* Ajuste directo al tamaño del icono */}
                        {getIcon(modulo.codigo)}
                      </Icon>
                      <Typography
                        variant="caption"
                        component="div"
                        align="center"
                        sx={{
                          fontWeight: "medium",
                          fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.9rem" },
                          lineHeight: 1.1,
                        }}
                      >
                        {modulo.descripcion}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ width: '100%', marginTop: '50px', marginBottom: '100px' }}>
          <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            Calendario de Reservas
          </Typography>

          {/* Select para filtrar espacios */}
          <FormControl sx={{ m: 1, width: 300, transform: 'scale(0.75)',transformOrigin: 'top left' }}>
            <InputLabel sx={{ fontSize: '0.875rem' }}>Espacios</InputLabel>
            <Select
              multiple
              value={espaciosSeleccionados}
              onChange={handleChange}
              renderValue={(selected) => selected.join(', ')}
              label="Espacios"
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
            locale={esLocale}
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


        <Snackbar
          open={snackBarState.open}
          autoHideDuration={4000}
          onClose={closeSnackBar}
        >
          <Alert
            onClose={closeSnackBar}
            severity={snackBarState.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackBarState.message}
          </Alert>
        </Snackbar>
      </Container>

      {
          (rolUsuarioBD !== "CONSULTA") && (
            <Fab
              color={'primary'}
              aria-label='Add'
              variant="extended"
              sx={fabStyle}
              // onClick={() => setOpenDialog(true)}
              onClick={() => {
                setDialogOrigin('B');
                setOpenDialog(true);
              }}
            >
              <AddIcon />
              NUEVA RESERVA
            </Fab>
          )
        }

        {/* <Fab sx={fabStyle} aria-label='Add' color={'primary'} variant="extended" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                    NUEVA RESERVA
        </Fab> */}
    </>
  );
}
