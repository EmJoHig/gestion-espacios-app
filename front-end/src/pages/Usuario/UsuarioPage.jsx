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
// import DialogEditarUsuario from './DialogEditarUsuario';
// import TablaUsuarios from './TablaUsuarios';
import { useUsuario } from "../../context/usuarioContext";

export function UsuarioPage() {

    const { usuarios, getUsuarios, createUsuario, updateUsuario, deleteUsuario, getUsuariosAUTH0 } = useUsuario();
    const { user, getAccessTokenSilently } = useAuth0();
    const [usuarioesUsuarioAUTH0, setUsuarioesUsuarioAUTH0] = useState([]);

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

        getUsuariosAUTH0();
        
    }, []);


    const [usuarioEdicion, setUsuarioEdicion] = React.useState(null);

    const [usuarioIdToDelete, setUsuarioIdToDelete] = React.useState(null);

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);



    // const RedirigirAsociarUsuarioes = () => {
    //     console.log("Usuarioes", usuarioes);
    // };


    //DIALOG EDITAR

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSubmitEdit = async (usuarioJson) => {
        try {
            const { name, description } = usuarioJson;
            usuarioEdicion.name = name;
            usuarioEdicion.description = description;
            
            console.log("usuarioEdicion", usuarioEdicion);

            const resp = await updateUsuario(usuarioEdicion);

            if (resp === "") {
                openSnackBar('El usuario se ha editado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo editar el usuario. Inténtalo de nuevo.', 'error');
            }

            window.location.reload();
            
            // await getUsuarioes();
            // handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            openSnackBar('Error al editar el usuario. Verifica los datos.', 'error');
        }
    };


    const handleClick = (property) => (event) => {

    };

    const handleSetUsuarioState = (usuario) => {
        setUsuarioEdicion(usuario);
        handleClickOpenEdit();
    }



    const EliminarUsuario = async (id) => {

        try {

            const resp = await deleteUsuario(id);

            if (resp === "") {
                openSnackBar('El usuario se ha eliminado con éxito.', 'success');
            } else {
                openSnackBar('No se pudo eliminado el usuario. Inténtalo de nuevo.', 'error');
            }

            window.location.reload();
            // await getUsuarioes();
            // handleCloseConfirm();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            openSnackBar('Error al eliminar el usuario. Verifica los datos.', 'error');
        }
    }

    //confirmar eliminar
    const handleConfirmarEliminarUsuario = (id) => {
        setUsuarioIdToDelete(id);
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
                        {"Eliminar Usuario"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Esta seguro que desea eliminar el usuario?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm}>CANCELAR</Button>
                        <Button onClick={() => EliminarUsuario(id)} autoFocus>
                            CONFIRMAR
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }



    return (
        <>
            <Box sx={{ marginTop: '50px', marginBottom: '150px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo Usuarios
                </Typography>

                <Button variant="contained" onClick={() => navigate("/home")} >
                    HOME
                </Button>

                <Button variant="contained" onClick={() => navigate("/asociar-roles")} style={{ marginLeft: '20px' }}>ASOCIAR ROLES</Button>


                {/* {openEdit && (
                    <DialogEditarUsuario
                        usuario={usuarioEdicion}
                        open={openEdit}
                        onClose={handleCloseEdit}
                        onSubmit={handleSubmitEdit}
                    />
                )} */}

                {/* {openConfirm && <RenderizarDialogConfirmar open={openConfirm} id={usuarioIdToDelete} />} */}

                <Box sx={{ marginTop: '50px' }}>

                    <Typography gutterBottom variant="h5" component="div">
                        Usuarioes UTH0
                    </Typography>

                    <br />
                    <Divider />
                    <br />

                    {usuarios != null && usuarios.length > 0 ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {usuarios.length === 0 && (
                                <h1>no hay usuarios</h1>
                            )}

                            {usuarios.map((usuario) => (
                                <Grid item xs={3} key={usuario.id}>
                                    <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={handleClick(null)}>

                                        <CardContent>
                                            <Stack direction="row" spacing={0} sx={{
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                            }}>
                                                <IconButton aria-label="edit" onClick={() => handleSetUsuarioState(usuario)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Stack>
                                        </CardContent>
                                        
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <b>{usuario.nombreUsuario}</b>
                                            </Typography>
                                            <br />
                                            <Typography gutterBottom variant="h6" component="div">
                                                {usuario.email}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <h1>no hay usuarioesUsuario</h1>
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
