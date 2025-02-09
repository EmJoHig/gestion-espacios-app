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
import TablaReservas from './TablaReservas.jsx';
import { useAuth0 } from "@auth0/auth0-react";

// importo el conetxt de usuario para llamar a la api
import { useReserva } from "../../context/reservaContext.jsx";
import { useEspacio } from "../../context/espacioContext.jsx";
// import { useUsuario } from "../../context/usuarioContext.jsx";

//picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export function ReservasPage() {

    // const { user } = useAuth0();

    const { loading, getReservasFilter, bajaReserva } = useReserva();

    const [listReservasFilter, setListReservasFilter] = useState([]);

    const { espacios, getEspacios } = useEspacio();

    // const { getUserByIdAUTH0 } = useUsuario();

    const [cleared, setCleared] = useState(false);

    const [espacioSelect, setEspacioSelect] = React.useState('');

    const [valueFecha, setValueFecha] = useState(null);

    // const [isAdmin, setIsAdmin] = useState(false);

    // const [usuarioBD, setUsuarioBD] = useState(null);

    // const bodyGetreservasPorResp = {
    //     idMinistDeResponsable: null,
    //     espacioId: null,
    //     fechaInicio: null,
    // };

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
        espacioId: espacioSelect || "", // Agregar solo si tiene valor
        // fechaInicio: valueFecha ? valueFecha.toISOString() : "", // Agregar solo si tiene valor
        fechaInicio: valueFecha && dayjs(valueFecha).isValid() ? dayjs(valueFecha).format('YYYY-MM-DD') : "",
    };


    // useEffect(() => {
        
    // }, []);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                
                await getEspacios();
                const resp = await getReservasFilter(filtros);
                setListReservasFilter(resp);

            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        checkAccess();
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


    const ChangeSelectEspacio = (event) => {
        setEspacioSelect(event.target.value);
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
        {
            id: 'fechaBaja',
            numeric: true,
            disablePadding: false,
            label: 'Fecha Baja',
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

        try {
            filtros.espacioId = espacioSelect;
            filtros.fechaInicio = valueFecha ? valueFecha.format('YYYY-MM-DD') : "";

            const resp = await getReservasFilter(filtros);
            setListReservasFilter(resp);

            // if (isAdmin) {
            //     await getreservasFilter(filtros);
            // } else {
            //     if (usuarioBD !== null) {
                    
            //         bodyGetreservasPorResp.idMinistDeResponsable = usuarioBD.ministerioId;
            //         bodyGetreservasPorResp.espacioId = espacioSelect;
            //         bodyGetreservasPorResp.fechaInicio = valueFecha ? valueFecha.format('YYYY-MM-DD') : "";

            //         await getreservasPorResponsable(bodyGetreservasPorResp);
            //     }
            // }
        } catch (error) {
            openSnackBar('Error al obtener reservas.', 'error');
        }

    };


    const onReservasSelected = async (reserva) => {
        try {

            const bodyDarBaja = {
                idReserva: reserva[0],
            };

            const resp = await bajaReserva(bodyDarBaja);
            console.log("resp: ", resp);
            if (resp == "") {
                
                openSnackBar('La reserva se dio de baja con éxito.', 'success');
                    
            } else {
                openSnackBar('Error al dar de baja la reserva.', 'error');
            }

            filtros.espacioId = espacioSelect;
            filtros.fechaInicio = valueFecha ? valueFecha.format('YYYY-MM-DD') : "";

            const list = await getReservasFilter(filtros);
            setListReservasFilter(list);

        } catch (error) {
            openSnackBar('Error al dar de baja la reserva.', 'error');
        }
    };



    return (
        <>
            <Container fixed>
                <Box sx={{ marginTop: '50px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Modulo de Reservas
                    </Typography>

                    <Button style={{ marginTop: '10px', marginBottom: '10px' }} variant="contained" onClick={() => navigate("/home")}>
                        HOME
                    </Button>

                    <Box sx={{ width: '100%', marginTop: '50px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Espacio
                                </Typography>
                                <FormControl sx={{ width: '100%', marginTop: 3 }} variant="standard">
                                    <Select
                                        value={espacioSelect}
                                        onChange={ChangeSelectEspacio}
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
                            BUSCAR RESERVAS
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
                        ) : listReservasFilter && listReservasFilter.length > 0 ? (
                            <TablaReservas data={listReservasFilter} columnasTabla={columnas} onReservasSelected={onReservasSelected} />
                        ) : (
                            <Box sx={{ textAlign: 'center' }}>
                                <Card sx={{ maxWidth: "100%" }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                No hay reservas
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Box>
                        )
                    }
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
