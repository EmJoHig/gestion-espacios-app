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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

//dialog
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";




// import TablaSolictudes from './TablaSolicitudes.jsx';

// importo el conetxt de usuario para llamar a la api
import { useUsuario } from "../../context/usuarioContext.jsx";
import { useMinisterio } from "../../context/ministerioContext.jsx";
import { useActividad } from "../../context/actividadContext.jsx";
import { useEspacio } from '../../context/espacioContext';
import { useReserva } from '../../context/reservaContext.jsx';

//picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function ReservasPage() {
    const { usuarios, getUsuarios } = useUsuario();
    const { ministerios, getMinisterios, createMinisterio, updateMinisterio } = useMinisterio();
    const { actividades, getActividades } = useActividad();
    const { espacios, getEspacios } = useEspacio();
    const { reservas, getReservas, createReserva } = useReserva();

    // Estados para los selectores
    const [selectedMinisterio, setSelectedMinisterio] = useState('');
    const [selectedActividad, setSelectedActividad] = useState('');
    const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
    const [selectedEspacio, setSelectedEspacio] = useState('');


    const [valueFecha, setValueFecha] = useState(null);
    const [horaInicio, setHoraInicio] = useState(null);
    const [horaFin, setHoraFin] = useState(null);

    const navigate = useNavigate();

    // cuando inicia la pantalla se ejecuta 
    // Obtener datos cuando se carga el componente
    useEffect(() => {
        const fetchData = async () => {
            await getMinisterios(); // Llama a la API y actualiza el contexto
            await getActividades(); // Llama a la API y actualiza el contexto
            await getEspacios();
        };
        fetchData();
    }, []);
      

    const handleEspacioChange = (event) => {
        setSelectedEspacio(event.target.value);
    };


    // Manejar el cambio en el selector de ministerios
    const handleMinisterioChange = (event) => {
        const selectedId = event.target.value;
        console.log("aca: ", selectedId)
        setSelectedMinisterio(selectedId);
        // Filtrar actividades relacionadas con el ministerio seleccionado
        const actividadesRelacionadas = actividades.filter((actividad) => actividad.ministerioId === selectedId);
        setActividadesFiltradas(actividadesRelacionadas);
        setSelectedActividad(''); // Reiniciar actividad seleccionada
        console.log("act: ",actividadesRelacionadas)
    };

    // Manejar el cambio en el selector de actividades
    const handleActividadChange = (event) => {
        setSelectedActividad(event.target.value);
    };

    console.log("min: ", selectedMinisterio)
    console.log("act: ", selectedActividad)
    console.log("esp: ", selectedEspacio)
    console.log("fecha", valueFecha)
    console.log("horaInicio", horaInicio)
    console.log("fechaFin", horaFin)

    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };




    // DIALOG RESERVA METODOS
    const [open, setOpen] = React.useState(false);

    const handleAbrirDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

/*     const handleGuardarSolicitud = () => {
        setOpen(false);
    }; */

    

    const buildReservaObject = () => {
        if (!valueFecha || !horaInicio || !horaFin || !selectedEspacio || !selectedMinisterio || !selectedActividad) {
            console.error("Faltan datos para construir la reserva");
            return;
        }
    
        const fechaInicio = dayjs(valueFecha.$d)
            .hour(horaInicio.$H)
            .minute(horaInicio.$m)
            .second(horaInicio.$s)
            .toISOString(); // Convierte a formato ISO
    
        const fechaFin = dayjs(valueFecha.$d)
            .hour(horaFin.$H)
            .minute(horaFin.$m)
            .second(horaFin.$s)
            .toISOString(); // Convierte a formato ISO
    
        const reserva = {
            espacioId: selectedEspacio,
            ministerioId: selectedMinisterio,
            actividadId: selectedActividad,
            fechaInicio,
            fechaFin,
        };
    
        console.log("Reserva construida:", reserva);
        return reserva;
    };

    const handleGuardarSolicitud = async () => {
        const nuevaReserva = buildReservaObject();
    
        if (nuevaReserva) {
            try {
                await createReserva(nuevaReserva);
                console.log("Reserva creada con éxito");
                setOpen(false);
            } catch (error) {
                console.error("Error al crear la reserva:", error);
            }
        } else {
            console.error("No se pudo construir la reserva. Verifica los datos.");
        }
    };
    



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
                        Selecciona un ministerio y una actividad para la nueva reserva.
                    </DialogContentText>

                    {/* Selector de Ministerios */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="ministerio-label">Ministerio</InputLabel>
                        <Select
                            labelId="ministerio-label"
                            value={selectedMinisterio}
                            onChange={handleMinisterioChange}
                        >
                            {ministerios.map((ministerio) => (
                                <MenuItem key={ministerio.id} value={ministerio.id}>
                                    {ministerio.codigo} - {ministerio.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Selector de Actividades */}
                    <FormControl fullWidth margin="normal" disabled={!selectedMinisterio}>
                        <InputLabel id="actividad-label">Actividad</InputLabel>
                        <Select
                            labelId="actividad-label"
                            value={selectedActividad}
                            onChange={handleActividadChange}
                        >
                            {actividadesFiltradas.map((actividad) => (
                                <MenuItem key={actividad.id} value={actividad.id}>
                                    {actividad.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Selector de Espacios */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="espacio-label">Espacio</InputLabel>
                        <Select
                            labelId="espacio-label"
                            value={selectedEspacio}
                            onChange={handleEspacioChange}
                        >
                            {espacios.map((espacio) => (
                                <MenuItem key={espacio.id} value={espacio.id}>
                                    {espacio.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <DialogContentText>
                        {/* Please enter the start and end dates, select the days, and add any observations. */}
                    </DialogContentText>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <div>
                                <Typography gutterBottom variant="h6" component="div">
                                    Día de Reserva
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker 
                                            label="Seleccionar Día" 
                                            value={valueFecha} 
                                            onChange={(newValue) => setValueFecha(newValue)} 
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <Typography gutterBottom variant="h6" component="div">
                                    Hora Inicio
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker 
                                            label="Hora Inicio" 
                                            value={horaInicio} 
                                            onChange={(newValue) => {
                                                setHoraInicio(newValue);
                                                // Ajusta automáticamente la hora de fin
                                                setHoraFin(newValue?.add(1, 'hour'));
                                            }} 
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: '20px' }}>
                            <div>
                                <Typography gutterBottom variant="h6" component="div">
                                    Hora Fin
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker 
                                            label="Hora Fin" 
                                            value={horaFin} 
                                            onChange={(newValue) => setHoraFin(newValue)} 
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </Grid>
                    </Grid>

{/*                     <Grid container rowSpacing={1} style={{ marginTop: '20px' }}>
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
                    </Grid> */}

{/*                     <TextField
                        margin="dense"
                        id="observacion"
                        name="observacion"
                        label="Observacion"
                        type="text"
                        fullWidth
                        variant="standard"
                    /> */}
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


                <Typography gutterBottom variant="h4" component="div" style={{ marginTop: '50px' }}>
                    componente CALENDARIO QUE MUESTRE LOS DIAS QUE HAY RESERVAS
                </Typography>


                {/* <MonthlyCalendar /> */}


                
            </Box>
            <Fab sx={fabStyle} aria-label='Add' color={'primary'} variant="extended" onClick={handleAbrirDialog}>
                    <AddIcon />
                    NUEVA RESERVA
                </Fab>
        </>
    );
}
