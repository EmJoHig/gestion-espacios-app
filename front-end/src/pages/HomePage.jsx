import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import img1 from '../assets/municipalidad.jpg';
import img2 from '../assets/responsables.jpg';
import MaterialTable from '../components/MaterialTable';
import { useAuth } from "../context/authContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function HomePage() {
  // const [usuario, setUsuario] = useState(null);
  // const { isAuthenticated, logout } = useAuth();

  
  const navigate = useNavigate();

  useEffect(() => {
    
    // setUsuario(_usuario);
    // console.log(usuario);
  }, []);

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
        descripcion: "Solicitudes de Reservas",
        ruta: "/solicitudes-reservas"
      },
      {
        codigo: "5",
        descripcion: "ABM Ministerios",
        ruta: "/ministerio"
      },
      {
        codigo: "6",
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

  // Configuración de eventos con color asignado
  const events = [
    { title: 'Reserva Aula 1', start: '2024-11-01T10:00:00', end: '2024-11-01T12:00:00', espacio: 'Aula 1', color: colorMapping["Aula 1"] },
    { title: 'Reserva Aula 2', start: '2024-11-02T14:00:00', end: '2024-11-02T15:30:00', espacio: 'Aula 2', color: colorMapping["Aula 2"] },
    { title: 'Reserva Salón Principal', start: '2024-11-03T09:00:00', end: '2024-11-03T11:00:00', espacio: 'Salón Principal', color: colorMapping["Salón Principal"] },
    { title: 'Reserva Cocina', start: '2024-11-04T16:00:00', end: '2024-11-04T18:00:00', espacio: 'Cocina', color: colorMapping["Cocina"] },
    { title: 'Reserva Aula 3', start: '2024-11-05T13:00:00', end: '2024-11-05T15:00:00', espacio: 'Aula 3', color: colorMapping["Aula 3"] }
  ];

    // Espacios disponibles para filtrar
    const espaciosDisponibles = Object.keys(colorMapping);

    // Estado para el filtro de espacios seleccionados
    const [espaciosSeleccionados, setEspaciosSeleccionados] = useState(espaciosDisponibles);
  
    // Manejar el cambio en el filtro de espacios
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setEspaciosSeleccionados(typeof value === 'string' ? value.split(',') : value);
    };
  
    // Filtrar eventos según los espacios seleccionados
    const eventosFiltrados = events.filter((event) => espaciosSeleccionados.includes(event.espacio));
  


  const handleClick = (property) => (event) => {
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
            <Grid item xs={3}>
              <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(modulo.ruta)}>
                <CardActionArea>
                  {/* <CardMedia
                    id={modulo.id}
                    component="img"
                    height="140"
                    image={img2}
                    alt="green iguana"
                  /> */}
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



      {/* {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div> */}
    </>
  );
}
