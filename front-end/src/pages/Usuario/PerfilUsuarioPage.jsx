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
// import DialogEditarUsuario from './DialogEditarUsuario';
// import TablaUsuarios from './TablaUsuarios';
import { useUsuario } from "../../context/usuarioContext";

export function PerfilUsuarioPage() {

    const navigate = useNavigate();
    const { updateUsuario, getUserByIdAUTH0 } = useUsuario();
    const { user, getAccessTokenSilently } = useAuth0();

    const [usuarioEdicion, setUsuarioEdicion] = React.useState(null);
    const [usuarioIdToDelete, setUsuarioIdToDelete] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [snackBarState, setSnackBarState] = React.useState({
        open: false,
        message: '',
        severity: 'success', // Puede ser 'success', 'error', 'info', 'warning'
    });

    //snackbar
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


    const [usuario, setUsuario] = useState({
        id: '',
        nombre: '',
        apellido: '',
        nombreUsuario: "",
        dni: '',
        telefono: ''
    });

    const [usuarioEditando, setUsuarioEditando] = useState(null);



    useEffect(() => {
        if (user) {
            // console.log("user: ", user);
            const id = user.sub;
            const fetchGetUserPorAUTH0id = async () => {
                try {
                    const usuario = await getUserByIdAUTH0(id);
                    setUsuario({
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        nombreUsuario: usuario.nombreUsuario,
                        dni: usuario.dni,
                        telefono: usuario.telefono
                    });

                } catch (error) {
                    console.error("Error fetching tipos de espacio:", error);
                }
            };
            fetchGetUserPorAUTH0id();
        }
    }, []);




    const handleEditUsuario = () => {
        setUsuarioEditando({ ...usuario });
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'dni' || name == 'telefono') {
            const numericValue = value.replace(/\D/g, ''); // Reemplaza cualquier cosa que no sea un número
            const maxLength = name === "dni" ? 9 : 13;
            if (numericValue.length <= maxLength) {
                setUsuarioEditando({ ...usuarioEditando, [name]: numericValue });
            }
        } else {
            setUsuarioEditando({ ...usuarioEditando, [name]: value });
        }
    };

    const handleSaveUsuario = async () => {
        try {
            const resp = await updateUsuario(usuarioEditando);

            if (resp) {
                openSnackBar('Usuario actualizado con éxito', 'success');
                setUsuario(resp);
            } else {
                openSnackBar('Error al actualizar el usuario.', 'error');
            }

            setOpenEdit(false);
        } catch (error) {
            openSnackBar('Error al actualizar usuario', 'error');
        }
    };


    return (
        <>
            <Container fixed>
                <Box sx={{ marginTop: '50px', marginBottom: '150px' }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px' }}> Perfil de Usuario </Typography>

                    <Button variant="contained" onClick={() => navigate("/home")}> HOME</Button>

                    <Box sx={{ marginTop: '50px', justifyContent: 'center' }}>
                        <Grid justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                            <Grid item xs={12} sm={8} md={6} lg={4}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, #42a5f5 30%, #1e88e5 90%)',
                                        boxShadow: 5,
                                        borderRadius: 4,
                                        p: 3,
                                        color: 'white'
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleEditUsuario}
                                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                                        >
                                            Editar Perfil
                                        </Button>
                                    </CardContent>
                                    <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, textAlign: 'left' }}>
                                        <Typography variant="h6"><b>Nombre:</b> {usuario.nombre}</Typography>
                                        <Typography variant="h6"><b>Apellido:</b> {usuario.apellido}</Typography>
                                        <Typography variant="h6"><b>Nombre Usuario:</b> {usuario.nombreUsuario}</Typography>
                                        <Typography variant="h6"><b>DNI:</b> {usuario.dni}</Typography>
                                        <Typography variant="h6"><b>Teléfono:</b> {usuario.telefono}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Dialog open={openEdit} onClose={handleCloseEdit}>
                        <DialogTitle>Editar Usuario</DialogTitle>
                        <DialogContent>
                            <TextField margin="dense" name="nombre" label="Nombre" fullWidth value={usuarioEditando?.nombre || ''} onChange={handleChange} />
                            <TextField margin="dense" name="apellido" label="Apellido" fullWidth value={usuarioEditando?.apellido || ''} onChange={handleChange} />
                            <TextField margin="dense" name="nombreUsuario" label="Nombre Usuario" fullWidth value={usuarioEditando?.nombreUsuario || ''} onChange={handleChange} />
                            <TextField
                                margin="dense"
                                name="dni"
                                label="DNI"
                                fullWidth
                                value={usuarioEditando?.dni || ''}
                                onChange={handleChange}
                                type="text" // Asegura que solo se ingresen números
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 9 }} // Asegura que sea solo numérico
                            />
                            <TextField
                                margin="dense"
                                name="telefono"
                                label="Teléfono"
                                fullWidth
                                value={usuarioEditando?.telefono || ''}
                                onChange={handleChange}
                                type="text" // Asegura que solo se ingresen números
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 13 }} // Asegura que sea solo numérico
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEdit}>Cancelar</Button>
                            <Button onClick={handleSaveUsuario} variant="contained" color="primary">Guardar</Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar open={snackBarState.open} autoHideDuration={4000} onClose={closeSnackBar}>
                        <Alert onClose={closeSnackBar} severity={snackBarState.severity} variant="filled" sx={{ width: '100%' }}>
                            {snackBarState.message}
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </>
    );
}
