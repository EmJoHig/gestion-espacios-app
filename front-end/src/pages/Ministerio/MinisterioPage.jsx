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
import TablaMinisterios from './TablaMinisterios';
import { useMinisterio } from "../../context/ministerioContext";

export function MinisterioPage() {

    const { ministerios, getMinisterios, createMinisterio, updateMinisterio, bajaMinisterio, ministeriosBaja, getMinisteriosBaja } = useMinisterio();
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
        getMinisterios();
        getMinisteriosBaja();
    }, []);

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
    ];

    const columnasBaja = [
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
            id: 'fechaBaja',
            numeric: true,
            disablePadding: false,
            label: 'Fecha Baja',
        },
    ];


    const [ministerioEdicion, setMinisterioEdicion] = React.useState(null);

    const [ministerioIdToDelete, setMinisterioIdToDelete] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (ministJson) => {
        try {
            const { codigo, descripcion } = ministJson;

            const respCreate = await createMinisterio(ministJson);

            if (respCreate == "") {
                openSnackBar('El ministerio se ha creado con éxito.', 'success');
            } else {
                openSnackBar('Error al crear el ministerio.', 'error');
            }


            await getMinisterios();
            handleClose();
        } catch (error) {
            console.error('Error al crear el ministerio:', error);
        }
    };


    //edit
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleSubmitEdit = async (ministJson) => {
        try {
            const { codigo, descripcion } = ministJson;
            ministerioEdicion.codigo = codigo;
            ministerioEdicion.descripcion = descripcion;
            const respEdit = await updateMinisterio(ministerioEdicion);

            if (respEdit == "") {
                openSnackBar('El ministerio se ha editado con éxito.', 'success');
            } else {
                openSnackBar('Error al editar el ministerio.', 'error');
            }

            await getMinisterios();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el ministerio:', error);
        }
    };


    const handleTEST = () => {
        console.log("Ministerios", ministerios);
    };






    //DIALOG NUEVO
    function RenderizarDialogNuevoMinist(props) {
        // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columnasTablaParam } =
        //     props;
        // const createSortHandler = (property) => (event) => {
        //     onRequestSort(event, property);
        // };

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
                    <DialogTitle>Nuevo Ministerio</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Guardar</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    //DIALOG EDITAR

    function RenderizarDialogEditarMinist({ ministerio }) {

        // console.log("Ministerio a editar:", ministerio);

        const [codigoEdit, setCodigoEdit] = React.useState(ministerio ? ministerio.codigo : "");
        const [descripcionEdit, setDescripcionEdit] = React.useState(ministerio ? ministerio.descripcion : "");

        // Actualiza el estado cuando cambien los valores de los campos
        const handleCodigoChange = (event) => {
            setCodigoEdit(event.target.value);
        };

        const handleDescripcionChange = (event) => {
            setDescripcionEdit(event.target.value);
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
                            handleSubmitEdit(formJson);
                        },
                    }}
                >
                    <DialogTitle>Editar Ministerio</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={codigoEdit}
                            onChange={handleCodigoChange}
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
                            value={descripcionEdit}
                            onChange={handleDescripcionChange}

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
    const handleObtenerRow = (ministerio) => {
        console.log("Datos del ministerio seleccionado:", ministerio);
        setMinisterioEdicion(ministerio);
        handleClickOpenEdit();
    };

    // metodo que envia el id de la row seleccionada para eliminar
    const handleDeleteMinisterio = (idsMinisterio) => {
        setMinisterioIdToDelete(idsMinisterio);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const EliminarMinisterioRequest = async (idMinist) => {

        try {

            const respDelete = await bajaMinisterio(idMinist);

            if (respDelete == "") {
                openSnackBar('El ministerio ha sido dado de baja con éxito.', 'success');
            } else {
                openSnackBar('Error al dar de baja el ministerio.', 'error');
            }

            await getMinisterios();
            await getMinisteriosBaja();
            handleCloseConfirm();
        } catch (error) {
            console.error('Error al editar el ministerio:', error);
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
                        {"Eliminar Ministerio"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea dar de baja el ministerio?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => EliminarMinisterioRequest(id)} autoFocus>
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
                        Modulo Ministerios
                    </Typography>

                    <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                        HOME
                    </Button>

                    <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                    <Button variant="contained" onClick={() => navigate("/asociar-responsables")} style={{ marginLeft: '20px' }}>Asociar Responsables</Button>
                    <Button variant="contained" onClick={() => navigate("/asociar-actividades")} style={{ marginLeft: '20px' }}>Administrar Actividades de Ministerios</Button>

                    {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={ministerioIdToDelete} />}

                    <RenderizarDialogNuevoMinist />

                    {openEdit && (
                        <RenderizarDialogEditarMinist ministerio={ministerioEdicion} />
                    )}

                    <Box sx={{ marginTop: '50px' }}>
                        <TablaMinisterios
                            data={ministerios}
                            columnasTabla={columnas}
                            nombreTabla={"Listado de Ministerios"}
                            onEditClick={handleObtenerRow}
                            onClickDeleteMinisterio={handleDeleteMinisterio}
                        />
                    </Box>

                    <Box sx={{ marginTop: '50px' }}>
                        <TablaMinisterios
                            data={ministeriosBaja}
                            columnasTabla={columnasBaja}
                            nombreTabla={"Listado de Ministerios dados de baja"}
                            onEditClick={handleObtenerRow}
                            onClickDeleteMinisterio={handleDeleteMinisterio}
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
