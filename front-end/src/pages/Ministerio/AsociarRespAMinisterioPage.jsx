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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useAuth0 } from "@auth0/auth0-react";

import TablaAsociarMinisteroUsuario from '../Ministerio/TablaAsociarMinisteroUsuario';
import DialogEditarMinisterioUsuario from '../Ministerio/DialogEditarMinisterioUsuario';
import { useMinisterio } from "../../context/ministerioContext";
import { useUsuario } from "../../context/usuarioContext";


export function AsociarRespAMinisterioPage() {

    const { user } = useAuth0();
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



    // const { ministerios, getMinisterios, createMinisterio, updateMinisterio, deleteMinisterio, AsociarMinisterioAlUsuario } = useMinisterio();
    const { usuarios, getUsuarios, createUsuario, updateUsuario, deleteUsuario } = useUsuario();

    const { ministerios, getMinisterios, AsociarResponsableAMinist } = useMinisterio();

    const [rolesUsuarioAUTH0, setRolesUsuarioAUTH0] = useState([]);
    const [usuarioMinisterioEdicion, setUsuarioMinisterioEdicion] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);

    const [idMinisterioSelect, setMinisterioSelect] = React.useState('');


    const bodyRequest = {
        idUsuario: null,
        idMinisterio: null
    };



    const columnas = [
        {
            id: 'nombreUsuario',
            numeric: false,
            disablePadding: true,
            label: 'Nombre Usuario',
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'ministerio',
            numeric: true,
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


    useEffect(() => {
        getMinisterios();
        getUsuarios();
        // if (user && user["https://gestion-espacios/roles"]) {
        //     const rolesFromUser = user["https://gestion-espacios/roles"];
        //     setRolesUsuarioAUTH0(rolesFromUser);
        // }
    }, []);//[user]


    //metodo que envia los datos de la fila seleccionada para editar
    const handleObtenerRow = (usuario) => {
        //console.log("Datos del usuario seleccionado:", usuario);

        //Datos del usuario seleccionado
        setUsuarioMinisterioEdicion(usuario);
        setMinisterioSelect(usuario.ministerioId ? usuario.ministerioId : "");
        handleClickOpenEdit();
    };


    // EDICION DE ROL DE USUARIO
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSubmitEdit = async (ministerioid) => {
        try {
            bodyRequest.idUsuario = usuarioMinisterioEdicion.id;
            bodyRequest.idMinisterio = ministerioid === '' ? null : ministerioid;

            //console.log("body a editar:", bodyRequest);

            const respAsociar = await AsociarResponsableAMinist(bodyRequest);
            if (respAsociar == "") {
                openSnackBar('Se asigno el ministerio con éxito.', 'success');
            } else {
                openSnackBar('Error al asignar el ministerio a usuario.', 'error');
            }

            await getUsuarios();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el ministerio:', error);
        }
    };

    const handleTEST = () => {
        console.log("USUARIOS", usuarios);
    };

    return (
        <>
            <Container fixed>
                <Box sx={{ marginTop: '50px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        ASOCIAR RESPONSABLE A MINISTERIO
                    </Typography>
                    <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                        HOME
                    </Button>
                    <Button variant="contained" onClick={() => navigate("/ministerio")} style={{ marginRight: '20px' }}>
                        MINISTERIOS
                    </Button>

                    {/* <Button variant="contained" onClick={handleTEST} style={{ marginLeft: '20px' }}>get users</Button> */}

                    {openEdit && (
                        <DialogEditarMinisterioUsuario
                            usuario={null}
                            open={openEdit}
                            onClose={handleCloseEdit}
                            onSubmit={handleSubmitEdit}
                            ministerios={ministerios}
                            idMinisterioSelect={idMinisterioSelect}
                            setMinisterioSelect={setMinisterioSelect}
                        />
                    )}

                    <Box sx={{ marginTop: '50px' }}>
                        <TablaAsociarMinisteroUsuario
                            data={usuarios}
                            columnasTabla={columnas}
                            nombreTabla={"Usuarios"}
                            onEditClick={handleObtenerRow}
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
