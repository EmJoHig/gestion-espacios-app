import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import img1 from '../assets/municipalidad.jpg';
import img2 from '../assets/responsables.jpg';
import MaterialTable from '../components/MaterialTable';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useAuth } from "../context/authContext";


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
    console.log(usuario);
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
    ]
  };

  

  const [age, setAge] = React.useState('');

  const ChangeSelectMuni = (event) => {
    setAge(event.target.value);
  };


  // const handleClick = (event) => {
  //   console.log('click');
  //   console.log(event);
  //   // navigate('/ministerio');
  // };


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
