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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TablaGenerica from '../../components/TablaGenerica';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogEditarActividad from './DialogEditarActividad';
import DialogNuevaActividad from './DialogNuevaActividad';
import TablaActividades from './TablaActividades';
import { useActividad } from "../../context/actividadContext";
import { useMinisterio } from "../../context/ministerioContext";

export function ActividadPage() {

    const { actividades, getActividades, createActividad, updateActividad, deleteActividad } = useActividad();

    const { ministerios, getMinisterios } = useMinisterio();

    const navigate = useNavigate();

    const [idMinisterioSelect, setMinisterioSelect] = React.useState('');

    const [actividadEdicion, setActividadEdicion] = React.useState(null);

    const [actIdToDelete, setActIdToDelete] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

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

    useEffect(() => {
        getActividades();
        getMinisterios();
    }, []);



    const columnas = [
        {
            id: 'nombre',
            numeric: false,
            disablePadding: true,
            label: 'Nombre',
        },
        {
            id: 'descripcion',
            numeric: false,
            disablePadding: false,
            label: 'Descripcion',
        },
        {
            id: 'ministerio',
            numeric: false,
            disablePadding: false,
            label: 'Ministerio',
        },
        {
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
    ];


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (actividadJson) => {
        try {
            const { nombre, descripcion, ministerioId } = actividadJson;
            if (ministerioId === "") {
                actividadJson.ministerioId = null;
            }

            const resp = await createActividad(actividadJson);
            if (resp === "") {
                openSnackBar('La actividad se ha creado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo crear la actividad. Inténtalo de nuevo.', 'error');
            }

            await getActividades();
            handleClose();
        } catch (error) {
            console.error('Error al crear la actividad:', error);
            // handleClose();
            openSnackBar('Error al crear la actividad. Verifica los datos.', 'error');
        }
    };


    //edit
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleSubmitEdit = async (actividadJson) => {
        try {
            const { nombre, descripcion, ministerioId } = actividadJson;

            actividadEdicion.nombre = nombre;
            actividadEdicion.descripcion = descripcion;
            actividadEdicion.ministerioId = ministerioId;

            console.log("actividadEdicion", actividadEdicion);

            const resp = await updateActividad(actividadEdicion);
            if (resp === "") {
                openSnackBar('La actividad se ha editado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo editar la actividad. Inténtalo de nuevo.', 'error');
            }

            await getActividades();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el actividad:', error);
            // handleCloseEdit();
            openSnackBar('Error al editar la actividad. Verifica los datos.', 'error');
        }
    };


    const handleTEST = () => {
        console.log("actividades", actividades);
    };


    const handleObtenerRow = (actividad) => {
        setActividadEdicion(actividad);
        setMinisterioSelect(actividad.ministerioId);
        handleClickOpenEdit();
    };


    const EliminarActividad = async (id) => {
        try {
            console.log("id actividad a eliminar:", actIdToDelete);

            const resp = await deleteActividad(actIdToDelete);
            if (resp === "") {
                openSnackBar('La actividad se ha eliminado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo eliminado la actividad. Inténtalo de nuevo.', 'error');
            }
            await getActividades();
            handleCloseConfirm();
        } catch (error) {
            console.error('Error al eliminar la actividad:', error);
            openSnackBar('Error al eliminar la actividad.', 'error');
        }
    }


    // metodo que envia el id de la row seleccionada para eliminar
    const handleDeleteActividad = (idactividad) => {
        console.log("id actividad seleccionado:", idactividad);
        setActIdToDelete(idactividad);
        setOpenConfirm(true);
    };

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
                        {"Eliminar Actividad"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea eliminar la actividad?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => EliminarActividad(id)} autoFocus>
                            CONFIRMAR
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo actividades
                </Typography>

                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>

                <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                <Button variant="contained" onClick={() => navigate("/asociar-actividades")} style={{ marginLeft: '20px' }}>Administrar Actividades de Ministerios</Button>


                {openEdit && (
                    <DialogEditarActividad
                        actividad={actividadEdicion}
                        open={openEdit}
                        onClose={handleCloseEdit}
                        onSubmit={handleSubmitEdit}
                        ministerios={ministerios}
                        idMinisterioSelect={idMinisterioSelect}
                        setMinisterioSelect={setMinisterioSelect} />
                )}


                {open && (
                    <DialogNuevaActividad
                        // actividad={null}
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleSubmit}
                        ministerios={ministerios}
                    // idMinisterioSelect={idMinisterioSelect}
                    // setMinisterioSelect={setMinisterioSelect} 
                    />
                )}

                {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={actIdToDelete} />}

                <Box sx={{ marginTop: '50px' }}>

                    {actividades != null && actividades.length > 0 ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {actividades.length === 0 && (
                                <h1>no hay actividades</h1>
                            )}

                            <TablaActividades
                                data={actividades}
                                columnasTabla={columnas}
                                nombreTabla={"Listado de actividades"}
                                onEditClick={handleObtenerRow}
                                onClickDeleteActividad={handleDeleteActividad}
                            />
                        </Grid>
                    ) : (
                        <h1>no hay actividades</h1>
                    )}

                </Box>



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
        </>
    );
}
