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
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TablaGenerica from '../../components/TablaGenerica';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import DialogEditarActividad from './DialogEditarActividad';
import DialogAsociarActividadMinisterio from './DialogAsociarActividadMinisterio';
import TablaActividades from './TablaActividades';
import { useActividad } from "../../context/actividadContext";
import { useMinisterio } from "../../context/ministerioContext";
import { useAuth0 } from "@auth0/auth0-react";

export function AsociarActMinisterioPage() {

    const navigate = useNavigate();
    const { ministerios, getMinisterios, getActividadesMinisterio } = useMinisterio();// ministerios
    const { asociarActividadAMinisterio, quitarActividadAMinisterio } = useActividad();// actividades
    const [actividades, setActividades] = useState([]);
    const [idMinisterioSelect, setMinisterioSelect] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [actividadIdToQuitar, setActividadIdToQuitar] = React.useState(null);


    const [openBtnASociarAct, setOpenBtnASociarAct] = React.useState(false);


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


    const bodyRequest = {
        idMinisterio: null
    };

    //body request para asociar actividades a ministerio
    const bodyRequestAsocActMinist = {
        idsActividades: null,
        idMinisterio: null
    };



    useEffect(() => {
        getMinisterios();
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    // BUSQUEDA ACTIVIDADES DE MINISTERIO
    const handleChangeMinisterio = async (event) => {

        setMinisterioSelect(event.target.value);
        bodyRequest.idMinisterio = event.target.value;

        const resp = await getActividadesMinisterio(bodyRequest);

        if (resp) {
            setActividades(resp.data);
            setOpenBtnASociarAct(true);
        }
        else {
            setActividades([]);
            setOpenBtnASociarAct(false);
        }
    }


    const handleAgregarActividadMinisterio = () => {
        setOpen(true);
        console.log("agregar actividad a ministerio");
    };


    const handleSubmitAsociarActividad = async (idActividades) => {
        try {
            //console.log("idActividades", idActividades);
            const cantActs = idActividades.length;

            bodyRequestAsocActMinist.idsActividades = idActividades;
            bodyRequestAsocActMinist.idMinisterio = idMinisterioSelect;

            const resp = await asociarActividadAMinisterio(bodyRequestAsocActMinist);

            if (resp == "") {

                bodyRequest.idMinisterio = idMinisterioSelect;
                const resp = await getActividadesMinisterio(bodyRequest);

                if (resp)
                    setActividades(resp.data);
                else
                    setActividades([]);

                openSnackBar('Se ascociaron ' + cantActs + ' actividades', 'success');
            } else {
                openSnackBar('Error al asociar las actividades.', 'error');
            }

            handleClose();
        } catch (error) {
            console.error('Error al asociar las actividades', error);
        }
    };




    const SubmitQuitarActividadAMinisterio = async (idActividad) => {
        try {
            //console.log("idActividad", idActividad);

            const body = {
                idActividad: idActividad,
                idMinisterio: idMinisterioSelect
            };

            const resp = await quitarActividadAMinisterio(body);

            if (resp == "") {

                bodyRequest.idMinisterio = idMinisterioSelect;
                const resp = await getActividadesMinisterio(bodyRequest);

                if (resp)
                    setActividades(resp.data);
                else
                    setActividades([]);

                openSnackBar('Se quito la actividad correctamente', 'success');
            } else {
                openSnackBar('Error al quitar la actividad.', 'error');
            }

            handleCloseConfirm();
            handleClose();
        } catch (error) {
            console.error('Error al quitar la actividad', error);
        }
    };



    //confirmar QUITAR ACTIVIDAD
    const handleConfirmarQuitarActividad = (id) => {
        setActividadIdToQuitar(id);
        setOpenConfirm(true);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };


    function RenderizarDialogConfirmar({ id }) {
        return (
            <>
                <Dialog
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Quitar  Actividad"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea quitar la actividad?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => SubmitQuitarActividadAMinisterio(id)} autoFocus>
                            CONFIRMAR
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    return (
        <>
            <Container fixed>
                <Box sx={{ marginTop: '50px' }}>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '20px' }}>
                        Administrar Actividades de Ministerios
                    </Typography>

                    <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                        HOME
                    </Button>

                    <Button variant="contained" onClick={() => navigate("/actividad")} style={{ marginRight: '20px' }}>
                        ACTIVIDADES
                    </Button>

                    <Button variant="contained" onClick={() => navigate("/ministerio")} style={{ marginRight: '20px' }}>
                        MINISTERIOS
                    </Button>

                    {/* <Button variant="contained" onClick={() => handleTEST(null)}>Nuevo</Button> */}
                </Box>
                <Box sx={{ marginTop: '50px' }}>
                    <FormControl sx={{ minWidth: 400 }}>
                        <InputLabel id="ministerio-select-label"> Seleccione un Ministerio</InputLabel>
                        <Select
                            labelId="ministerio-select-label"
                            value={idMinisterioSelect}
                            onChange={(e) => handleChangeMinisterio(e)}
                            name="ministerioId"
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {ministerios.map((min) => (
                                <MenuItem key={min.id} value={min.id}>{min.descripcion}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {open && (
                    <DialogAsociarActividadMinisterio
                        // actividad={null}
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleSubmitAsociarActividad}
                        ministerios={ministerios}
                    // idMinisterioSelect={idMinisterioSelect}
                    // setMinisterioSelect={setMinisterioSelect} 
                    />
                )}

                {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={actividadIdToQuitar} />}

                <Box sx={{ marginTop: '50px' }}>

                    {openBtnASociarAct && (
                        <Button variant="contained" onClick={() => handleAgregarActividadMinisterio()} style={{ marginBottom: '20px' }}>
                            ASOCIAR ACTIVIDAD
                        </Button>
                    )}


                    {actividades != null && actividades.length > 0 ? (
                        <>
                            <Stack direction="row" spacing={4} sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Listado actividades
                                </Typography>

                            </Stack>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >

                                {actividades.length === 0 && (
                                    <h1>no hay actividades</h1>
                                )}

                                {actividades.map((act) => (
                                    <Grid item xs={3} key={act.id} sx={{ marginTop: '50px' }}>
                                        <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    <b>{act.codigo}</b>
                                                </Typography>
                                                <br />
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {act.nombre}
                                                </Typography>
                                                <br />
                                                <Button variant="contained" onClick={() => handleConfirmarQuitarActividad(act.id)}>
                                                    QUITAR ACTIVIDAD
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    ) : (
                        <h1>No hay actividades para el ministerio</h1>
                    )}
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
