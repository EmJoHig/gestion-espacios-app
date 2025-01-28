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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
import Container from '@mui/material/Container';
import DialogNuevoRol from './DialogNuevoRol';
import DialogEditarRol from './DialogEditarRol';
import TablaRoles from './TablaRoles';
import { useRol } from "../../context/rolContext";

export function RolPage() {

    const { roles, getRolesPorUsuario, getRolesAUTH0, createRol, updateRol, deleteRol } = useRol();
    const { user, getAccessTokenSilently } = useAuth0();
    const [rolesUsuarioAUTH0, setRolesUsuarioAUTH0] = useState([]);

    const [esAdmin, setEsAdmin] = useState(false);



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



    const navigate = useNavigate();

    useEffect(() => {
        // getRolesPorUsuario();
        getRolesAUTH0();
        if (user && user["https://gestion-espacios/roles"]) {
            const rolesFromUser = user["https://gestion-espacios/roles"];

            const esAdmin = rolesFromUser.includes("ADMIN");

            if (esAdmin) {
                setEsAdmin(true);
            } else {
                setEsAdmin(false);
            }

            setRolesUsuarioAUTH0(rolesFromUser);
        }
    }, []);//[user]


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
            const resp = await createRol(user.sub, rolJson);

            if (resp === "") {
                openSnackBar('El rol se ha creado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo crear el rol. Inténtalo de nuevo.', 'error');
            }

            window.location.reload();
            // await getRoles();
            // handleClose();




            // Actualiza los roles del usuario
            // const updatedUser = await fetchUpdatedUser();
            // if (updatedUser && updatedUser["https://gestion-espacios/roles"]) {
            //     setRolesUsuarioAUTH0(updatedUser["https://gestion-espacios/roles"]);
            // }
        } catch (error) {
            console.error('Error al crear el rol:', error);
            openSnackBar('Error al crear el rol. Verifica los datos.', 'error');
        }
    };


    // const fetchUpdatedUser = async () => {
    //     try {
    //         const accessToken = await getAccessTokenSilently();
    //         const userInfo = await fetch(`https://dev-zgzo7qc6w6kujif0.us.auth0.com/userinfo`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         }).then((response) => response.json());

    //         return userInfo;
    //     } catch (error) {
    //         console.error("Error fetching updated user info:", error);
    //         return null;
    //     }
    // };



    // const RedirigirAsociarRoles = () => {
    //     console.log("Roles", roles);
    // };



    //DIALOG EDITAR

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

            console.log("rolEdicion", rolEdicion);

            const resp = await updateRol(rolEdicion);

            if (resp === "") {
                openSnackBar('El rol se ha editado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo editar el rol. Inténtalo de nuevo.', 'error');
            }

            window.location.reload();

            // await getRoles();
            // handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el rol:', error);
            openSnackBar('Error al editar el rol. Verifica los datos.', 'error');
        }
    };


    const handleClick = (property) => (event) => {

    };

    const handleSetRolState = (rol) => {
        setRolEdicion(rol);
        handleClickOpenEdit();
    }



    const EliminarRol = async (id) => {

        try {

            const resp = await deleteRol(id);

            if (resp === "") {
                openSnackBar('El rol se ha eliminado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo eliminado el rol. Inténtalo de nuevo.', 'error');
            }

            window.location.reload();
            // await getRoles();
            // handleCloseConfirm();
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            openSnackBar('Error al eliminar el rol. Verifica los datos.', 'error');
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
            <Container fixed>
                <Box sx={{ marginTop: '50px', marginBottom: '150px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Modulo Roles
                    </Typography>

                    <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                        HOME
                    </Button>

                    <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                    <Button variant="contained" onClick={() => navigate("/asociar-roles")} style={{ marginLeft: '20px' }}>ASOCIAR ROLES</Button>

                    {open && (
                        <DialogNuevoRol
                            open={open}
                            onClose={handleClose}
                            onSubmit={handleSubmit}
                        />
                    )}

                    {openEdit && (
                        <DialogEditarRol
                            rol={rolEdicion}
                            open={openEdit}
                            onClose={handleCloseEdit}
                            onSubmit={handleSubmitEdit}
                        />
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

                        {/* {esAdmin && (
                        rolesUsuarioAUTH0 != null && rolesUsuarioAUTH0.length > 0 ? (
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {rolesUsuarioAUTH0.length === 0 && (
                                    <h1>no hay roles</h1>
                                )}
                                {rolesUsuarioAUTH0.map((descrip) => (
                                    <Grid item xs={3} key={descrip}>
                                    <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>
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
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <b>{descrip}</b>
                                            </Typography>
                                            <br />
                                            <Typography gutterBottom variant="h6" component="div">
                                                {descrip}
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
                            <h1>no hay roles AUTH0</h1>
                        )
                    )} */}



                        <br />
                        <Divider />
                        <br />

                        {/* <Typography gutterBottom variant="h5" component="div">
                        Roles MI BD
                    </Typography> */}

                        {esAdmin && (
                            roles != null && roles.length > 0 ? (
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                    {roles.length === 0 && (
                                        <h1>no hay roles</h1>
                                    )}

                                    {roles.map((rol) => (
                                        <Grid item xs={3} key={rol.id}>
                                            <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>
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
                            )
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
            </Container>
        </>
    );
}
