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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import TablaRecursos from './TablaRecursos';
import { useRecurso } from "../../context/recursoContext";

export function RecursoPage() {

    const { recursos, getRecursos, createRecurso, updateRecurso, deleteRecurso } = useRecurso();
    const navigate = useNavigate();

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
        getRecursos();
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
            numeric: true,
            disablePadding: false,
            label: 'Descripcion',
        },
        {
            id: 'cantidad',
            numeric: true,
            disablePadding: false,
            label: 'Cantidad',
        },
        {
            id: 'disponible',
            numeric: true,
            disablePadding: true,
            label: 'Disponible',
        },
        {
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
    ];


    const [recursoEdicion, setRecursoEdicion] = React.useState(null);

    const [recursoIdToDelete, setRecursoIdToDelete] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (recursoJson) => {
        try {
            const { nombre, descripcion, cantidad } = recursoJson;

            const respCreate = await createRecurso(recursoJson);

            if (respCreate == "") {
                openSnackBar('El recurso se ha creado con éxito.', 'success');
            } else {
                openSnackBar('Error al crear el recurso.', 'error');
            }

            await getRecursos();
            handleClose();
        } catch (error) {
            openSnackBar('Error al crear el recurso.', 'error');
        }
    };


    //edit
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleSubmitEdit = async (recursoJson) => {
        try {
            const { nombre, descripcion, cantidad } = recursoJson;
            recursoEdicion.nombre = nombre;
            recursoEdicion.descripcion = descripcion;
            recursoEdicion.cantidad = cantidad;

            const respUpdate = await updateRecurso(recursoEdicion);

            if (respUpdate == "") {
                openSnackBar('El recurso se ha editado con éxito.', 'success');
            } else {
                openSnackBar('Error al editar el recurso.', 'error');
            }

            await getRecursos();
            handleCloseEdit();
        } catch (error) {
            openSnackBar('Error al editar el recurso.', 'error');
        }
    };


    //DIALOG NUEVO
    function RenderizarDialogNuevoRecurso(props) {
        const [cantidad, setCantidad] = React.useState("");
        const handleCantidadChange = (event) => {
            const value = event.target.value;
            // Validar que solo se ingresen números y que no excedan 4 dígitos
            if (/^\d{0,4}$/.test(value)) {
                setCantidad(value);
            }
        };

        return (
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            handleSubmit(formJson);
                        },
                    }}
                >
                    <DialogTitle>Nuevo Recurso</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            type="test"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="cantidad"
                            name="cantidad"
                            label="Cantidad"
                            type="number"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            fullWidth
                            variant="standard"
                            value={cantidad}
                            onChange={handleCantidadChange}
                            inputProps={{
                                pattern: "\\d{1,4}", // Expresión regular para 1 a 4 dígitos
                                maxLength: 4, // Limita la longitud máxima a 4 caracteres
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Guardar Recurso</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    //DIALOG EDITAR

    function RenderizarDialogEditarRecurso({ recurso }) {

        // console.log("Recurso a editar:", recurso);

        const [nombreEdit, setNombreEdit] = React.useState(recurso ? recurso.nombre : "");
        const [descripcionEdit, setDescripcionEdit] = React.useState(recurso ? recurso.descripcion : "");
        const [cantidadEdit, setCantidadEdit] = React.useState(recurso ? recurso.cantidad : "");
        const [errors, setErrors] = useState({});

        const validate = () => {
            const newErrors = {};
    
            if (!nombreEdit.trim()) newErrors.nombreEdit = "El nombre es obligatorio";
            // Validar que cantidad no sea menor
            if (cantidadEdit < recurso.cantidad) {
                newErrors.cantidadEdit = "La cantidad a editar no puede ser menor que la cantidad actual.";
            }
    
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
        }

        // Actualiza el estado cuando cambien los valores de los campos
        const handleNombreChange = (event) => {
            setNombreEdit(event.target.value);
        };
        const handleDescripcionChange = (event) => {
            setDescripcionEdit(event.target.value);
        };
        const handleCantidadChange = (event) => {
            // setCantidadEdit(event.target.value);
            const value = event.target.value;
            // Validar que solo se ingresen números y que no excedan 4 dígitos
            if (/^\d{0,4}$/.test(value)) {
                setCantidadEdit(value);
            }
            
        };
        return (
            <>
                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            // Validar si la cantidad es la misma, y si es así, establecerla como undefined
                            if (cantidadEdit === recurso.cantidad) {
                                delete formJson.cantidad;
                            }
                            console.log("Recirsooo",formJson);
                            if (!validate()) return;
                            handleSubmitEdit(formJson);
                        },
                    }}
                >
                    <DialogTitle>Editar Recurso</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={nombreEdit}
                            onChange={handleNombreChange}
                            helperText={errors.nombreEdit}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={descripcionEdit}
                            onChange={handleDescripcionChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="cantidad"
                            name="cantidad"
                            label="Cantidad"
                            type="number"
                            variant="standard"
                            fullWidth
                            value={cantidadEdit}
                            onChange={handleCantidadChange}
                            helperText={errors.cantidadEdit}
                            inputProps={{
                                pattern: "\\d{1,4}", // Expresión regular para 1 a 4 dígitos
                                maxLength: 4, // Limita la longitud máxima a 4 caracteres
                            }}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancelar</Button>
                        <Button type="submit">Guardar Edicion</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    //metodo que envia los datos de la fila seleccionada para editar
    const handleObtenerRow = (recurso) => {
        console.log("Datos del recurso seleccionado:", recurso);
        setRecursoEdicion(recurso);
        handleClickOpenEdit();
    };

    // metodo que envia el id de la row seleccionada para eliminar
    const handleDeleteRecurso = async (idRecurso) => {
        setRecursoIdToDelete(idRecurso);
        setOpenConfirm(true);
    };


    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };


    const EliminarRecursoRequest = async (idRecurso) => {
        console.log("Eliminar recurso con id:", idRecurso);

        try {
            const respDelete = await deleteRecurso(idRecurso);

            if (respDelete == "") {
                openSnackBar('El recurso se ha eliminado con éxito.', 'success');
            } else {
                openSnackBar('Error al eliminar el recurso.', 'error');
            }

            await getRecursos();
            handleCloseConfirm();
        } catch (error) {
            openSnackBar('Error al eliminar el recurso.', 'error');
        }

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
                        {"Eliminar Recurso"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea eliminar el recurso?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => EliminarRecursoRequest(id)} autoFocus>
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
                    <Typography gutterBottom variant="h5" component="div">
                        Modulo Recursos
                    </Typography>

                    <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                        HOME
                    </Button>

                    <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>

                    {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={recursoIdToDelete} />}


                    {openEdit && (
                        <RenderizarDialogEditarRecurso recurso={recursoEdicion} />
                    )}

                    <RenderizarDialogNuevoRecurso />

                    <Box sx={{ marginTop: '50px' }}>
                        <TablaRecursos
                            data={recursos}
                            columnasTabla={columnas}
                            nombreTabla={"Listado de Recursos"}
                            onEditClick={handleObtenerRow}
                            onClickDeleteRecurso={handleDeleteRecurso}
                        />
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
            </Container>
        </>
    );
}
