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
import { useActividad } from "../../context/actividadContext";

import TablaAsociarActividadMinisterio from './TablaAsociarActividadMinisterio';

function DialogAsociarActividadMinisterio({ open, onClose, onSubmit, ministerios }) {

    const { getActividadesSinMinisterio } = useActividad();


    const [actividadesSinMinist, setActividadesSinMinist] = useState([]);


    //USE EFFECT ASINCRONO
    useEffect(() => {
        const obtenerActividadesSinMinisterio = async () => {
            const _actsSinMinisterio = await getActividadesSinMinisterio();
            if (_actsSinMinisterio)
                setActividadesSinMinist(_actsSinMinisterio.data);
            else
                setActividadesSinMinist([]);
        };
        obtenerActividadesSinMinisterio();
    }, []);




    const columnas = [
        {
            id: 'nombre',
            numeric: false,
            disablePadding: true,
            label: 'Nombre',
        },
        {
            id: 'descripcion',
            numeric: false,
            disablePadding: false,
            label: 'Descripcion',
        },
        // {
        //     id: 'ministerio',
        //     numeric: false,
        //     disablePadding: false,
        //     label: 'Ministerio',
        // },
        // {
        //     id: 'accion',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Accion',
        // },
    ];


    const handleObtenerRow = (actividad) => {
        console.log("Datos del actividad seleccionado:", actividad);
        // setActividadEdicion(actividad);
        // handleClickOpenEdit();
    };


    const handleDeleteActividad = (idactividad) => {
        console.log("id actividad seleccionado:", idactividad);
        // setActIdToDelete(idactividad);
        // setOpenConfirm(true);
    };



    const onActividadesSelected = (idsSeleccionados) => {
        // Filtrar las actividades eliminadas
        // const actividadesActualizadas = actividades.filter(actividad => 
        //     !idsSeleccionados.includes(actividad.id)
        // );

        //console.log("ids Actividades seleccionadas: ", idsSeleccionados);
        onSubmit(idsSeleccionados);
    };

    return (
        <Dialog
            // fullWidth={true}
            maxWidth="md"
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    //console.log("formJson NUEVA act: ", formJson);
                    // onSubmit(formJson);
                },
            }}
        >
            <DialogTitle>Asociar Actividades</DialogTitle>
            <DialogContent>
                <Grid container>
                    {/* <Grid item xs={12}>
                        <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
                            <Select
                                // value={idMinisterioSelectLocal}
                                // onChange={(e) => setMinisterioSelect(e.target.value)}
                                name="ministerioId"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {ministerios.map((min) => (
                                    <MenuItem key={min.id} value={min.id}>{min.descripcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Box>
                        {actividadesSinMinist != null && actividadesSinMinist.length > 0 ? (
                            <Grid>

                                {actividadesSinMinist.length === 0 && (
                                    <h1>no hay actividades</h1>
                                )}

                                <TablaAsociarActividadMinisterio
                                    data={actividadesSinMinist}
                                    columnasTabla={columnas}
                                    nombreTabla={"Listado de actividades Sin Ministerio"}
                                    onEditClick={handleObtenerRow}
                                    onClickDeleteActividad={handleDeleteActividad}
                                    onActividadesSelected={onActividadesSelected}
                                />
                            </Grid>
                        ) : (
                            <h1>No hay actividades disponibles </h1>
                        )}
                    </Box>
                </Grid>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">ASOCIAR ACTIVIDAD</Button>
            </DialogActions> */}
        </Dialog>
    );
}

export default DialogAsociarActividadMinisterio;
