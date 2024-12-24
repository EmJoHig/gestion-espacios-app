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


function DialogNuevoRol({ open, onClose, onSubmit }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Descripcion"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogNuevoRol;
