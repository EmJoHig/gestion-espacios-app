import React, { useEffect, useState } from 'react';
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
import img1 from '../../assets/municipalidad.jpg';
import img2 from '../../assets/responsables.jpg';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TablaGenerica from '../../components/TablaGenerica';
import MonthlyCalendar from '../../components/MonthlyCalendar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TablaSolictudes from './TablaSolicitudes.jsx';

// importo el conetxt de usuario para llamar a la api
import { useUsuarios } from "../../context/usuarioContext.jsx";

//picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function SolicitudPage() {
    const { usuarios, getUsuarios } = useUsuarios();

    const [valueFecha, setValueFecha] = useState(null);

    const navigate = useNavigate();

    // cuando inicia la pantalla se ejecuta 
    useEffect(() => {
    }, []);

    const data = [
        { id: 110011, codigo: 'M1', descripcion: 'MINISTERIO 1', asdsad4: 'MINISTERIO 1', asddsad5: 'MINISTERIO 1', asdasdsad6: 'MINISTERIO 1' },
        { id: 220022, codigo: 'M2', descripcion: 'MINISTERIO DOS', asdsad4: 'MINISTERIO 1', asddsad5: 'MINISTERIO 1', asdasdsad6: 'MINISTERIO 1' },
        { id: 330033, codigo: 'M3', descripcion: 'MINISTERIO TRES', asdsad4: 'MINISTERIO 1', asddsad5: 'MINISTERIO 1', asdasdsad6: 'MINISTERIO 1' },
        { id: 440044, codigo: 'M4', descripcion: 'MINISTERIO CUATRO', asdsad4: 'MINISTERIO 1', asddsad5: 'MINISTERIO 1', asdasdsad6: 'MINISTERIO 1' },
    ];

    const [age, setAge] = React.useState('');

    const ChangeSelectMuni = (event) => {
        setAge(event.target.value);
    };


    const columnas = [
        {
            id: 'codigo',
            numeric: false,
            disablePadding: true,
            label: 'Codigo',
        },
        {
            id: 'descripcion',
            numeric: true,
            disablePadding: false,
            label: 'Descripcion',
        },
        {
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
        // {
        //     id: 'codigo67',
        //     numeric: false,
        //     disablePadding: true,
        //     label: 'Codigo',
        // },
        // {
        //     id: 'asdsd444',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Descripcion',
        // },
        // {
        //     id: 'sadasd555',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Accion',
        // },
    ];



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // haz un metodo para llamar a la api y traer los datos de las solicitudes
    const handleBuscar = async () => {
        // const Usuarios = await getUsuarios();;
        // console.log("Usuarios");
        // console.log(Usuarios);

        alert(valueFecha);
    };


    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo Solicitudes de Reserva
                </Typography>


                <Button style={{ marginTop: '10px' }} variant="contained" onClick={() => navigate("/home")}>
                    HOME
                </Button>

                {/* <MonthlyCalendar /> */}


                <Box sx={{ width: '100%', marginTop: '50px' }}>



                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4}>
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    Ministerios
                                </Typography>
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

                        <Grid item xs={8}>
                            <div>
                                <Typography gutterBottom variant="h5" component="div">
                                    Fecha
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={valueFecha} onChange={(newValue) => setValueFecha(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Button style={{ marginTop: '10px', marginBottom:'50px' }} variant="contained" onClick={handleBuscar}>BUSCAR RESERVAS</Button>
                </Box>




                {/* <TablaGenerica data={data} columnasTabla={columnas} nombreTabla={"Solicitudes de Reserva"} /> */}

                <TablaSolictudes data={data} columnasTabla={columnas}/>
            </Box>
        </>
    );
}
