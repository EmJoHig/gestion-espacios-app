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
import { useAuth0 } from "@auth0/auth0-react";

import TablaRoles from './TablaRoles';
import { useRol } from "../../context/rolContext";

export function RolPage() {

    const { roles, getRoles, createRol, updateRol } = useRol();
    const { user } = useAuth0();
    const [rolesUsuario, setRolesUsuario] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getRoles();
        console.log("USUARIO ROLES DATOS AUTH0");
        console.log(user);
        
        if (user && user["https://gestion-espacios/roles"]) {
            const rolesFromUser = user["https://gestion-espacios/roles"];
            setRolesUsuario(rolesFromUser);
            //console.log("roles_usuario", rolesFromUser);
        }
    }, [user]);

    // const data = [
    //     { id: 1, codigo: 'M1', descripcion: 'MINISTERIO 1' },
    //     { id: 2, codigo: 'M2', descripcion: 'MINISTERIO DOS' },
    //     { id: 3, codigo: 'M3', descripcion: 'MINISTERIO TRES' },
    //     { id: 4, codigo: 'M4', descripcion: 'MINISTERIO CUATRO' },
    // ];

    const [age, setAge] = React.useState('');

    const ChangeSelectMuni = (event) => {
        setAge(event.target.value);
    };


    const columnas = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'description',
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


    const [rolEdicion, setRolEdicion] = React.useState(null);



    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (rolJson) => {
        try {
            const { name, description } = rolJson;
            await createRol(rolJson);
            await getRoles();
            handleClose();
        } catch (error) {
            console.error('Error al crear el rol:', error);
        }
    };


    //edit
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleSubmitEdit = async (rolJson) => {
        try {
            const { name, description } = rolJson;
            rolEdicion.name = name;
            rolEdicion.description = description;
            await updateRol(rolEdicion);
            await getRols();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el rol:', error);
        }
    };


    const handleTEST = () => {
        console.log("Roles", roles);
    };






    //DIALOG NUEVO
    function RenderizarDialogNuevoRol(props) {
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
                    <DialogTitle>Nuevo Rol</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="descripcion"
                            name="description"
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

    function RenderizarDialogEditarRol({ rol }) {

        // console.log("Rol a editar:", rol);

        const [nameEdit, setNameEdit] = React.useState(rol ? rol.name : "");
        const [descriptionEdit, setDescriptionEdit] = React.useState(rol ? rol.description : "");

        // Actualiza el estado cuando cambien los valores de los campos
        const handleNameChange = (event) => {
            setNameEdit(event.target.value);
        };

        const handleDescripcionChange = (event) => {
            setDescriptionEdit(event.target.value);
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
                    <DialogTitle>Editar Rol</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={nameEdit}
                            onChange={handleNameChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Descripcion"
                            type="test"
                            fullWidth
                            variant="standard"
                            value={descriptionEdit}
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
    const handleObtenerRow = (rol) => {
        console.log("Datos del rol seleccionado:", rol);
        setRolEdicion(rol);
        handleClickOpenEdit();
    };

    // metodo que envia el id de la row seleccionada para eliminar
    const handleDeleteRol = (idsRoles) => {
        console.log("Datos del rol seleccionado:", idsRoles);

    };

    const handleClick = (property) => (event) => {
        
      };

    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo Roles
                </Typography>

                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>

                <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                <Button variant="contained" onClick={handleTEST} style={{ marginLeft: '20px' }}>Responsables por Rol</Button>
                <RenderizarDialogNuevoRol />
                <RenderizarDialogEditarRol rol={rolEdicion} />
                <Box sx={{ marginTop: '50px' }}>

                {/* {rolesUsuario != null && rolesUsuario.length > 0 ? (
                    <TablaRoles
                    data={rolesUsuario}
                    columnasTabla={columnas}
                    nombreTabla={"Listado de Roles"}
                    onEditClick={handleObtenerRow}
                    // onClickDeleteRol={handleDeleteRol}
                />
                ) : (
                    <h1>no hay roles</h1>
                )} */}

                {rolesUsuario != null && rolesUsuario.length > 0 ? (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        {rolesUsuario.length === 0 && (
                        <h1>no hay roles</h1>
                        )}

                        {rolesUsuario.map((descrip) => (
                        <Grid item xs={3}>
                            <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>
                            <CardActionArea>
                                {/* <CardMedia
                                id={modulo.id}
                                component="img"
                                height="140"
                                image={img2}
                                alt="green iguana"
                                /> */}
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {descrip}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                ) : (
                    <h1>no hay roles</h1>
                )}

                

                </Box>
            </Box>
        </>
    );
}
