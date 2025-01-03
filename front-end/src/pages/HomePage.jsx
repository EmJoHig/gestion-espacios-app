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

  const usuario = {
    username: "Belthier",
    email: "prueba.gmail.com",
    password: "12345678",
    role: "admin-espacio-reserv",
    modulos: [
      {
        codigo: "2",
        descripcion: "ABM Reservas",
        ruta: "/reservas"
      },
      {
        codigo: "3",
        descripcion: "ABM Espacios",
        ruta: "/espacio"
      },
      {
        codigo: "4",
        descripcion: "ABM RECURSOS",
        ruta: "/recurso"
      },
      {
        codigo: "5",
        descripcion: "Solicitudes de Reservas",
        ruta: "/solicitudes-reservas"
      },
      {
        codigo: "6",
        descripcion: "ABM Ministerios",
        ruta: "/ministerio"
      },
      {
        codigo: "7",
        descripcion: "ABM Actividades",
        ruta: "/actividad"
      },
      {
        codigo: "8",
        descripcion: "ABM ROLES",
        ruta: "/rol"
      },
      {
        codigo: "9",
        descripcion: "USUARIOS",
        ruta: "/usuarios"
      },
    ]
  };

  

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
      }else {
        await getReservas(); // Refrescar las reservas después de guardar
        setOpenDialog(false); // Cerrar el diálogo
      }  
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleUpdateReserva = async (reservaData) => {
    try {
        const updatedReserva = buildReservaObject(reservaData);
        const res = await updateReserva(reservaData.id, updatedReserva); // Suponiendo que tienes una función updateReserva
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


          {usuario.modulos.length === 0 && (
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
          ))}
        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginTop: '50px' }}>
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
              renderValue={(selected) =>  selected.join(', ')}
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
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
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

      <Box sx={{ width: '100%', marginTop: '50px' }}>

        <Typography gutterBottom variant="h5" component="div">
          Ministerios y responsables
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4}>
            <div>
              <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
                <Select
                  value={age}
                  onChange={ChangeSelectMuni}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>TODOS</em>
                  </MenuItem>
                  <MenuItem value={10}>MINISTERIO UNO</MenuItem>
                  <MenuItem value={20}>MINISTERIO DOS</MenuItem>
                  <MenuItem value={30}>MINISTERIO TRES</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Box>


      {usuario.role.includes("admin") && (
        <>
        <Typography gutterBottom variant="h5" component="div">
          esto solo se ve si es algun tipo de administrador
        </Typography>
          {/* <MaterialTable /> */}
        </>
      )}
    </>
  );
}
