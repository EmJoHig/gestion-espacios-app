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
//dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//dialog
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




// import TablaSolictudes from './TablaSolicitudes.jsx';

// importo el conetxt de usuario para llamar a la api
import { useUsuarios } from "../../context/usuarioContext.jsx";

//picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function ReservasPage() {
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


    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };

    // haz un metodo para llamar a la api y traer los datos de las solicitudes
    const handleBuscar = async () => {
        // const Usuarios = await getUsuarios();;
        // console.log("Usuarios");
        // console.log(Usuarios);

        alert(valueFecha);
    };



    // DIALOG RESERVA METODOS
    const [open, setOpen] = React.useState(false);

    const handleAbrirDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGuardarSolicitud = () => {
        setOpen(false);
    };

    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    return (
        <>
            {/* DIALOG RESEEVA  */}

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const { startDate, endDate, observation, days } = formJson;
                        console.log('Start Date:', startDate);
                        console.log('End Date:', endDate);
                        console.log('Selected Days:', days);
                        console.log('Observation:', observation);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Nueva Solicitud de Reserva</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* Please enter the start and end dates, select the days, and add any observations. */}
                    </DialogContentText>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <div>
                                <Typography gutterBottom variant="h6" component="div">
                                    Fecha Inicio
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={valueFecha} onChange={(newValue) => setValueFecha(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <Typography gutterBottom variant="h6" component="div">
                                    Fecha Fin
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={valueFecha} onChange={(newValue) => setValueFecha(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} style={{ marginTop: '20px' }}>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h6" component="div">
                                Periodicidad
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map((day) => (
                                <FormControlLabel
                                    key={day}
                                    control={<Checkbox name="days" value={day.toLowerCase()} />}
                                    label={day}
                                />
                            ))}
                        </Grid>
                    </Grid>

                    <TextField
                        margin="dense"
                        id="observacion"
                        name="observacion"
                        label="Observacion"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" onClick={handleGuardarSolicitud}>Guardar</Button>
                </DialogActions>
            </Dialog>


            {/* FIN DIALOG RESEEVA  */}

            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo ABM RESERVAS
                </Typography>


                <Button style={{ marginTop: '10px' }} variant="contained" onClick={() => navigate("/home")}>
                    HOME
                </Button>

                {/* <MonthlyCalendar /> */}


                
            </Box>
            <Fab sx={fabStyle} aria-label='Add' color={'primary'} variant="extended" onClick={handleAbrirDialog}>
                    <AddIcon />
                    NUEVA RESERVA
                </Fab>
        </>
    );
}
