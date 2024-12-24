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
import { useUsuario } from "../../context/usuarioContext";


function DialogEditarRol({ rol, open, onClose, onSubmit }) {

    const [nameEdit, setNameEdit] = React.useState(rol ? rol.name : "");
    const [descriptionEdit, setDescriptionEdit] = React.useState(rol ? rol.description : "");

    const handleNameChange = (event) => {
        setNameEdit(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescriptionEdit(event.target.value);
    };

    return (
        <Dialog
            open={open}
            fullWidth={true}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    onSubmit(formJson);
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
                    onChange={handleDescriptionChange}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Guardar Edicion</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditarRol;
