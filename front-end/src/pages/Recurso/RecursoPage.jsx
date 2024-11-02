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

import TablaRecursos from './TablaRecursos';
import { useRecurso } from "../../context/recursoContext";

export function RecursoPage() {

    const { recursos, getRecursos, createRecurso, updateRecurso } = useRecurso();
    const navigate = useNavigate();

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
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
    ];


    const [recursoEdicion, setRecursoEdicion] = React.useState(null);



    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (recursoJson) => {
        try {
            const { nombre, descripcion, cantidad } = recursoJson;
            await createRecurso(recursoJson);
            await getRecursos();
            handleClose();
        } catch (error) {
            console.error('Error al crear el recurso:', error);
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
            await updateRecurso(recursoEdicion);
            await getRecursos();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el recurso:', error);
        }
    };


    const handleTEST = () => {
        console.log("Recursos", recursos);
    };


    //DIALOG NUEVO
    function RenderizarDialogNuevoRecurso(props) {
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

        // Actualiza el estado cuando cambien los valores de los campos
        const handleNombreChange = (event) => {
            setNombreEdit(event.target.value);
        };
        const handleDescripcionChange = (event) => {
            setDescripcionEdit(event.target.value);
        };
        const handleCantidadChange = (event) => {
            setCantidadEdit(event.target.value);
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
    const handleDeleteRecurso = (idsRecursos) => {
        console.log("Datos del recurso seleccionado:", idsRecursos);

    };

    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo Recursos
                </Typography>

                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>

                <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                <Button variant="contained" onClick={handleTEST} style={{ marginLeft: '20px' }}>Responsables por Recurso</Button>
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
                        // onClickDeleteRecurso={handleDeleteRecurso}
                    />
                </Box>



            </Box>
        </>
    );
}
