import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';
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
import Stack from '@mui/material/Stack';
import TablaGenerica from '../../components/TablaGenerica';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth0 } from "@auth0/auth0-react";

import TablaRoles from './TablaRoles';
import { useRol } from "../../context/rolContext";

export function RolPage() {

    const { roles, getRoles, createRol, updateRol, deleteRol } = useRol();
    const { user } = useAuth0();
    const [rolesUsuarioAUTH0, setRolesUsuarioAUTH0] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getRoles();
        if (user && user["https://gestion-espacios/roles"]) {
            const rolesFromUser = user["https://gestion-espacios/roles"];
            setRolesUsuarioAUTH0(rolesFromUser);
        }
    }, []);//[user]

    // const ChangeSelectMuni = (event) => {
    //     setAge(event.target.value);
    // };


    const [rolEdicion, setRolEdicion] = React.useState(null);

    const [rolIdToDelete, setRolIdToDelete] = React.useState(null);


    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async (rolJson) => {
        try {
            console.log("user:", user);
            // const { name, description } = rolJson;
            await createRol(user.sub, rolJson);
            await getRoles();
            handleClose();
        } catch (error) {
            console.error('Error al crear el rol:', error);
        }
    };

    // const RedirigirAsociarRoles = () => {
    //     console.log("Roles", roles);
    // };

    //DIALOG NUEVO
    function RenderizarDialogNuevoRol(props) {
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
            await getRoles();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el rol:', error);
        }
    };


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


    // //metodo que envia los datos de la fila seleccionada para editar
    // const handleObtenerRow = (rol) => {
    //     console.log("Datos del rol seleccionado:", rol);
    //     setRolEdicion(rol);
    //     handleClickOpenEdit();
    // };


    const handleClick = (property) => (event) => {

    };

    const handleSetRolState = (rol) => {
        setRolEdicion(rol);
        handleClickOpenEdit();
    }



    const EliminarRol = async (id) => {

        try {
            await deleteRol(id);
            await getRoles();
            console.log("rol eliminado");
            handleCloseConfirm();
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
        }
    }

    //confirmar eliminar
    const handleConfirmarEliminarRol = (id) => {
        setRolIdToDelete(id);
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
                        {"Eliminar Rol"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea eliminar el rol?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => EliminarRol(id)} autoFocus>
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
                    Modulo Roles
                </Typography>

                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>

                <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                <Button variant="contained" onClick={() => navigate("/asociar-roles")} style={{ marginLeft: '20px' }}>ASOCIAR ROLES</Button>

                <RenderizarDialogNuevoRol />

                {openEdit && (
                    <RenderizarDialogEditarRol rol={rolEdicion} />
                )}

                {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={rolIdToDelete} />}

                <Box sx={{ marginTop: '50px' }}>

                    {/* {rolesUsuarioAUTH0 != null && rolesUsuarioAUTH0.length > 0 ? (
                    <TablaRoles
                    data={rolesUsuarioAUTH0}
                    columnasTabla={columnas}
                    nombreTabla={"Listado de Roles"}
                    onEditClick={handleObtenerRow}
                    // onClickDeleteRol={handleDeleteRol}
                />
                ) : (
                    <h1>no hay roles</h1>
                )} */}

                    <Typography gutterBottom variant="h5" component="div">
                        Roles UTH0
                    </Typography>

                    {rolesUsuarioAUTH0 != null && rolesUsuarioAUTH0.length > 0 ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {rolesUsuarioAUTH0.length === 0 && (
                                <h1>no hay roles</h1>
                            )}

                            {rolesUsuarioAUTH0.map((descrip) => (
                                <Grid item xs={3} key={descrip}>
                                    <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>
                                        <CardActionArea>
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
                        <h1>no hay roles AUTH0</h1>
                    )}

                    <br />
                    <Divider />
                    <br />

                    <Typography gutterBottom variant="h5" component="div">
                        Roles MI BD
                    </Typography>

                    {roles != null && roles.length > 0 ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {roles.length === 0 && (
                                <h1>no hay roles</h1>
                            )}

                            {roles.map((rol) => (
                                <Grid item xs={3} key={rol.id}>
                                    <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>
                                        {/* <CardActionArea> */}
                                            {/* <CardMedia
                                            id={modulo.id}
                                            component="img"
                                            height="140"
                                            image={img2}
                                            alt="green iguana"
                                            /> */}
                                            <CardContent>
                                                <Stack direction="row" spacing={0} sx={{
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                }}>
                                                    <IconButton aria-label="edit" onClick={() => handleSetRolState(rol)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Stack>
                                            </CardContent>
                                        {/* </CardActionArea> */}
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <b>{rol.name}</b>
                                            </Typography>
                                            <br />
                                            <Typography gutterBottom variant="h6" component="div">
                                                {rol.description}
                                            </Typography>
                                            <br />
                                            <Button variant="contained" onClick={() => handleConfirmarEliminarRol(rol.id)}>
                                                ELIMINAR
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <h1>no hay rolesUsuario</h1>
                    )}

                </Box>
            </Box>
        </>
    );
}
