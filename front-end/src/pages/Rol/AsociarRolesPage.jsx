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

import TablaAsociarRolUsuario from './TablaAsociarRolUsuario';
import RenderizarDialogEditarRolUsuario from './RenderizarDialogEditarRolUsuario';
import { useRol } from "../../context/rolContext";
import { useUsuario } from "../../context/usuarioContext";

export function AsociarRolesPage() {

    const { user } = useAuth0();
    const navigate = useNavigate();

    const { roles, getRoles, createRol, updateRol, deleteRol, AsociarRolAlUsuario } = useRol();
    const { usuarios, getUsuarios, createUsuario, updateUsuario, deleteUsuario } = useUsuario();

    const [rolesUsuarioAUTH0, setRolesUsuarioAUTH0] = useState([]);
    const [usuarioRolEdicion, setUsuarioRolEdicion] = React.useState(null);
    const [openEdit, setOpenEdit] = React.useState(false);

    const [idRolSelect, setRolSelect] = React.useState('');


    const bodyRequest = {
        idUsuario: null,
        idRol: null
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
            id: 'rol',
            numeric: true,
            disablePadding: false,
            label: 'Rol',
        },
        {
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
    ];


    useEffect(() => {
        getRoles();
        getUsuarios();
        if (user && user["https://gestion-espacios/roles"]) {
            const rolesFromUser = user["https://gestion-espacios/roles"];
            setRolesUsuarioAUTH0(rolesFromUser);
        }
    }, []);//[user]


    //metodo que envia los datos de la fila seleccionada para editar
    const handleObtenerRow = (usuario) => {
        // console.log("Datos del usuario seleccionado:", usuario);

        //Datos del usuario seleccionado
        setUsuarioRolEdicion(usuario);
        setRolSelect(usuario.rolId ? usuario.rolId : "");
        handleClickOpenEdit();
    };


    // EDICION DE ROL DE USUARIO
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleSubmitEdit = async (rolid) => {
        try {
            // console.log("rolid: ", rolid);
            bodyRequest.idUsuario = usuarioRolEdicion.id;
            bodyRequest.idRol = rolid;

            // console.log("body a editar:", bodyRequest);
            await AsociarRolAlUsuario(bodyRequest);
            await getUsuarios();
            handleCloseEdit();
        } catch (error) {
            console.error('Error al editar el rol:', error);
        }
    };

    const handleTEST = () => {
        console.log("USUARIOS", usuarios);
    };

    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Asociar roles a usuarios
                </Typography>
                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>
                <Button variant="contained" onClick={() => navigate("/rol")} style={{ marginRight: '20px' }}>
                    ROLES
                </Button>

                {/* <Button variant="contained" onClick={handleTEST} style={{ marginLeft: '20px' }}>get users</Button> */}

                {openEdit && (
                    <RenderizarDialogEditarRolUsuario
                        usuario={null}
                        open={openEdit}
                        onClose={handleCloseEdit}
                        onSubmit={handleSubmitEdit}
                        roles={roles}
                        idRolSelect={idRolSelect}
                        setRolSelect={setRolSelect}
                    />
                )}

                <Box sx={{ marginTop: '50px' }}>
                    <TablaAsociarRolUsuario
                        data={usuarios}
                        columnasTabla={columnas}
                        nombreTabla={"Listado de Usuarios"}
                        onEditClick={handleObtenerRow}
                    />
                </Box>
            </Box>
        </>
    );
}
