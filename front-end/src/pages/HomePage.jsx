import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MaterialTable from '../components/MaterialTable';
import { useAuth } from "../context/authContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export function HomePage() {

  const [eventos, setEventos] = useState([]);
  const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
  const [espaciosSeleccionados, setEspaciosSeleccionados] = useState([]);



  const getReservas = async () => {
    try {
      const responseReservas = await axios.get('http://localhost:3000/reserva/get_reservas');

          // Mapear los datos a un formato compatible con FullCalendar
      const eventosMapped = responseReservas.data.map((reserva) => ({
        title: `${reserva.Actividad.nombre} - ${reserva.Espacio.nombre} - ${reserva.Ministerio.codigo}`, // Título del evento
        start: reserva.fechaInicio, // Fecha de inicio
        end: reserva.fechaFin, // Fecha de fin
        color: colorMapping[reserva.Espacio.nombre] || '#000', // Asignar un color según el espacio
      }));

    setEventos(eventosMapped); // Actualizar el estado con los eventos mapeados
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const getEspacios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/espacio/get_espacios'); // Asegúrate de que esta URL sea la correcta
      const espacios = response.data.map((espacio) => espacio.nombre); // Asumiendo que 'nombre' es la propiedad relevante
      setEspaciosDisponibles(espacios); // Establece los espacios disponibles en el estado
    } catch (error) {
      console.error('Error al obtener los espacios:', error);
    }
  };


  
  const navigate = useNavigate();

  useEffect(() => {
    getEspacios();
    getReservas();
  }, []);
  
  useEffect(() => {
    // Cuando se cargan los espacios disponibles, seleccionarlos todos por defecto
    if (espaciosDisponibles.length > 0) {
      setEspaciosSeleccionados(espaciosDisponibles);
    }
  }, [espaciosDisponibles]);

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
        descripcion: "ABM ROLES",
        ruta: "/rol"
      },
    ]
  };

  

  const [age, setAge] = React.useState('');

  const ChangeSelectMuni = (event) => {
    setAge(event.target.value);
  };


  // Mapeo de colores para cada espacio
  const colorMapping = {
    "Aula 1": "#1E90FF",
    "Aula 2": "#32CD32",
    "Aula 3": "#FFD700",
    "Salón Principal": "#FF4500",
    "Cocina": "#8A2BE2"
  };

  const eventosFiltrados = eventos.filter((evento) =>
    espaciosSeleccionados.includes(evento.title.split(" - ")[1]) // Extrae el nombre del espacio del título
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
    console.log(ruta);
    navigate(ruta);
  };

  return (
    <>
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
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={eventosFiltrados}
          //editable={usuario.role.includes("admin")}
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
          <MaterialTable />
        </>
      )}
    </>
  );
}
