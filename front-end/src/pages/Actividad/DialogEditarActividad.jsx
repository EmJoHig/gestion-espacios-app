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


function DialogEditarActividad({ actividad, open, onClose, onSubmit, ministerios, idMinisterioSelect, setMinisterioSelect }) {

    const [nombreEdit, setNombreEdit] = React.useState(actividad ? actividad.nombre : "");
    const [descripcionEdit, setDescripcionEdit] = React.useState(actividad ? actividad.descripcion : "");

    const handleNombreChange = (event) => {
        setNombreEdit(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcionEdit(event.target.value);
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
                    console.log("formJson editar act: ", formJson);
                    onSubmit(formJson);
                },
            }}
        >
            <DialogTitle>Editar Actividad</DialogTitle>
            <br />
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
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
                                fullWidth
                                variant="standard"
                                value={descripcionEdit}
                                onChange={handleDescripcionChange}
                            />
                            <br />
                            <Select
                                value={idMinisterioSelect}
                                onChange={(e) => setMinisterioSelect(e.target.value)}
                                id="ministerioId"
                                name="ministerioId"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {ministerios.map((min) => (
                                    <MenuItem key={min.id} value={min.id}>{min.descripcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Guardar Edicion</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditarActividad;
