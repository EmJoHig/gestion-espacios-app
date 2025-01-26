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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TablaSolicitudes from './TablaSolicitudes.jsx';

// importo el conetxt de usuario para llamar a la api
import { useSolicitud } from "../../context/solicitudContext.jsx";
import { useEspacio } from "../../context/espacioContext.jsx";
import { useReserva } from "../../context/reservaContext.jsx";

//picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function SolicitudPage() {

    const { solicitudes, loading, getSolicitudesFilter, getSolicitud, cambiarEstadoSolicitud } = useSolicitud();

    const { createReserva } = useReserva();

    const { espacios, getEspacios } = useEspacio();

    const [cleared, setCleared] = useState(false);

    const [ministerioSelect, setMinisterioSelect] = React.useState('');

    const [valueFecha, setValueFecha] = useState(null);

    const navigate = useNavigate();

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


    const filtros = {
        espacioId: ministerioSelect || "", // Agregar solo si tiene valor
        fechaInicio: valueFecha ? valueFecha.toISOString() : "", // Agregar solo si tiene valor
    };


    // cuando inicia la pantalla se ejecuta 
    useEffect(() => {
        getSolicitudesFilter(filtros);
        getEspacios();
    }, []);


    //cleared date picker
    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);
            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);


    const ChangeSelectMinisterio = (event) => {
        setMinisterioSelect(event.target.value);
    };


    const columnas = [
        {
            id: 'espacio',
            numeric: false,
            disablePadding: true,
            label: 'Espacio',
        },
        {
            id: 'ministerio',
            numeric: true,
            disablePadding: false,
            label: 'Ministerio',
        },
        {
            id: 'actividad',
            numeric: false,
            disablePadding: true,
            label: 'Actividad',
        },
        {
            id: 'estado',
            numeric: true,
            disablePadding: false,
            label: 'Estado',
        },
        {
            id: 'fechaInicio',
            numeric: true,
            disablePadding: false,
            label: 'Fecha Inicio',
        },
        {
            id: 'fechaFin',
            numeric: true,
            disablePadding: false,
            label: 'Fecha Fin',
        },
    ];



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleBuscar = async () => {

        filtros.espacioId = ministerioSelect;
        filtros.fechaInicio = valueFecha ? valueFecha.format('YYYY-MM-DD') : "";

        await getSolicitudesFilter(filtros);
    };


    const onSolicitudesSelected = async (solicitud, codigoEstado) => {
        try {

            const bodyChangeEstado = {
                codigoEstado: codigoEstado,
                idSolicitud: solicitud[0],//idSeleccionado[0],
            };

            const resp = await cambiarEstadoSolicitud(bodyChangeEstado);

            if (resp == "") {
                if (codigoEstado === "AP") {

                    openSnackBar('Se aprobo la solicitud con exito.', 'success');

                    // creo la reserva
                    // ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡   IMPROTANTE HACER Y DESCOMENTAR     ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡

                    const idSolicitud = solicitud[0];
                    const responseGetSolicitud = await getSolicitud(idSolicitud);

                    console.log("responseGetSolicitud: ", responseGetSolicitud);

                    if (!responseGetSolicitud) {
                        throw new Error("Error al obtener la solicitud");
                    }

                    const nuevaReserva = {
                        id: null,
                        ministerioId: responseGetSolicitud.ministerioId,
                        actividadId: responseGetSolicitud.actividadId,
                        espacioId: responseGetSolicitud.espacioId,
                        fechaInicio: responseGetSolicitud.fechaInicio ? responseGetSolicitud.fechaInicio : null,
                        fechaFin: responseGetSolicitud.fechaFin ? responseGetSolicitud.fechaFin : null,
                    };

                    console.log("nuevaReserva: ", nuevaReserva);

                    // llamo al endpoint de createReserva
                    const res = await createReserva(nuevaReserva); // Asume que tienes la función `createReserva`

                    if (!res.success) {
                        openSnackBar('No se pudo crear la RESERVA. Intente nuevamente.', 'error');
                    } else {
                        openSnackBar('Se creó la RESERVA con exito.', 'success');
                    }
                }
                else
                    openSnackBar('Se rechazo la solicitud con exito.', 'success');
            } else {
                if (codigoEstado === "AP")
                    openSnackBar('Error al aprobar la solicitud.', 'error');
                else
                    openSnackBar('Error al rechazar la solicitud.', 'error');
            }

            filtros.espacioId = ministerioSelect;
            filtros.fechaInicio = valueFecha ? valueFecha.format('YYYY-MM-DD') : "";

            await getSolicitudesFilter(filtros);

        } catch (error) {
            if (codigoEstado === "AP") {
                openSnackBar('Error al aprobar la solicitud.', 'error');
            } else {
                openSnackBar('Error al rechazar la solicitud.', 'error');
            }
        }
    };



    return (
        <>
            <Container fixed>
                <Box sx={{ marginTop: '50px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Modulo Solicitudes de Reserva
                    </Typography>

                    <Button style={{ marginTop: '10px', marginBottom: '10px' }} variant="contained" onClick={() => navigate("/home")}>
                        HOME
                    </Button>

                    {/* <Typography gutterBottom variant="h4" component="div">
                    componente CALENDARIO QUE MUESTRE LOS DIAS QUE HAY RESERVAS
                </Typography> */}
                    {/* <MonthlyCalendar /> */}

                    <Box sx={{ width: '100%', marginTop: '50px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Espacio
                                </Typography>
                                <FormControl sx={{ width: '100%', marginTop: 3 }} variant="standard">
                                    <Select
                                        value={ministerioSelect}
                                        onChange={ChangeSelectMinisterio}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>TODOS</em>
                                        </MenuItem>
                                        {
                                            espacios.map((espacio) => (
                                                <MenuItem key={espacio.id} value={espacio.id}>{espacio.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Typography gutterBottom variant="h5" component="div">
                                Ministerio
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
                        </Grid> */}

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Fecha Inicio
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/* <DemoContainer components={['DatePicker']}> */}
                                    <DatePicker
                                        slotProps={{
                                            field: { clearable: true, onClear: () => setCleared(true) },
                                        }}
                                        value={valueFecha}
                                        onChange={(newValue) => setValueFecha(newValue)}
                                    />
                                    {/* </DemoContainer> */}
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginTop: '40px', marginBottom: '80px' }}
                            variant="contained"
                            onClick={handleBuscar}
                        >
                            BUSCAR SOLICITUDES
                        </Button>
                    </Box>


                    {
                        loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // height: '100vh'
                                }}
                            >
                                <Card sx={{ padding: 2, boxShadow: 3, maxWidth: 400, textAlign: 'center' }}>
                                    <CardContent>
                                        <CircularProgress />
                                        <Typography variant="h4" gutterBottom>
                                            Buscando ...
                                        </Typography>

                                        {/* <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                                        Por favor, espere mientras cargamos la información.
                                    </Typography> */}
                                    </CardContent>
                                </Card>
                            </Box>
                        ) : solicitudes && solicitudes.length > 0 ? (
                            <TablaSolicitudes data={solicitudes} columnasTabla={columnas} onSolicitudesSelected={onSolicitudesSelected} />
                        ) : (
                            <Box sx={{ textAlign: 'center' }}>
                                <Card sx={{ maxWidth: "100%" }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                No hay solicitudes de reserva
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Box>
                        )
                    }
                    {/* <TablaGenerica data={data} columnasTabla={columnas} nombreTabla={"Solicitudes de Reserva"} /> */}
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
        </>
    );
}
