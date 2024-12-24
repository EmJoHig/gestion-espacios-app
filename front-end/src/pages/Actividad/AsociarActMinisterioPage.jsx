import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import img1 from '../../assets/municipalidad.jpg';
import img2 from '../../assets/responsables.jpg';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TablaGenerica from '../../components/TablaGenerica';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DialogEditarActividad from './DialogEditarActividad';
import DialogAsociarActividadMinisterio from './DialogAsociarActividadMinisterio';
import TablaActividades from './TablaActividades';
import { useActividad } from "../../context/actividadContext";
import { useMinisterio } from "../../context/ministerioContext";
import { useAuth0 } from "@auth0/auth0-react";

export function AsociarActMinisterioPage() {

    const navigate = useNavigate();
    const { ministerios, getMinisterios, getActividadesMinisterio } = useMinisterio();// ministerios
    // const { actividades, getActividades, createActividad, updateActividad } = useActividad();// actividades
    const [actividades, setActividades] = useState([]);
    const [idMinisterioSelect, setMinisterioSelect] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const bodyRequest = {
        idMinisterio: null
    };

    useEffect(() => {
        // getActividades();
        getMinisterios();

        const nuevasActividades = [];
        for (let i = 1; i <= 5; i++) {
            nuevasActividades.push({
                id: i,
                codigo: `ACT-${Math.floor(1000 + Math.random() * 9000)}`,
                descripcion: `descripcion ${i} de la actividad ${i}`,
                ministerioId: Math.floor(1 + Math.random() * 10),
                ministerio: {
                    id: Math.floor(1 + Math.random() * 10),
                    descripcion: `Ministerio ${Math.floor(1 + Math.random() * 10)}`,
                },
            });
        }
        setActividades(nuevasActividades);
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    // BUSQUEDA ACTIVIDADES DE MINISTERIO
    const handleChangeMinisterio = (event) => {
        setMinisterioSelect(event.target.value);
        //busco las actividades asociadas al ministerio
        bodyRequest.idMinisterio = event.target.value;
        getActividadesMinisterio(bodyRequest);
    }

    const handleTEST = (act) => {
        console.log("actividades", actividades);
    };

    const handleAgregarActividadMinisterio = () => {
        setOpen(true);
        console.log("agregar actividad a ministerio");

    };


    const handleSubmitAsociarActividad = async (actividadMinistJson) => {
        try {
            const { idActividad, idMinisterio } = actividadMinistJson;
            console.log("actividadJson", actividadMinistJson);

            // await createActividad(actividadJson);
            // await getActividades();
            handleClose();
        } catch (error) {
            console.error('Error al crear el actividad:', error);
        }
    };


    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Asociar actividades a Ministerio
                </Typography>
                <Button variant="contained" onClick={() => navigate("/home")} style={{ marginRight: '20px' }}>
                    HOME
                </Button>

                <Button variant="contained" onClick={() => navigate("/actividad")} style={{ marginRight: '20px' }}>
                    ACTIVIDADES
                </Button>
                {/* <Button variant="contained" onClick={() => handleTEST(null)}>Nuevo</Button> */}
            </Box>
            <Box sx={{ marginTop: '50px' }}>
                <FormControl sx={{ minWidth: 400 }}>
                    <InputLabel id="ministerio-select-label"> Seleccione un Ministerio</InputLabel>
                    <Select
                        labelId="ministerio-select-label"
                        value={idMinisterioSelect}
                        onChange={(e) => handleChangeMinisterio(e)}
                        name="ministerioId"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {ministerios.map((min) => (
                            <MenuItem key={min.id} value={min.id}>{min.descripcion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {open && (
                    <DialogAsociarActividadMinisterio
                        // actividad={null}
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleSubmitAsociarActividad}
                        ministerios={ministerios}
                    // idMinisterioSelect={idMinisterioSelect}
                    // setMinisterioSelect={setMinisterioSelect} 
                    />
                )}

            <Box sx={{ marginTop: '50px' }}>
                {actividades != null && actividades.length > 0 ? (
                    <>
                        <Stack direction="row" spacing={4} sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Listado actividades
                            </Typography>
                            <Button variant="contained" onClick={() => handleAgregarActividadMinisterio()} style={{ marginLeft: '20px' }}>
                                AGREGAR ACTIVIDAD
                            </Button>
                        </Stack>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >

                            {actividades.length === 0 && (
                                <h1>no hay actividades</h1>
                            )}

                            {actividades.map((act) => (
                                <Grid item xs={3} key={act.id} sx={{ marginTop: '50px' }}>
                                    <Card sx={{ maxWidth: '100%', textAlign: 'center', backgroundColor: '#90caf9' }} onClick={() => handleTEST(null)}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <b>{act.codigo}</b>
                                            </Typography>
                                            <br />
                                            <Typography gutterBottom variant="h6" component="div">
                                                {act.descripcion}
                                            </Typography>
                                            <br />
                                            <Button variant="contained" onClick={() => handleTEST(act.id)}>
                                                QUITAR
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <h1>no hay actividades</h1>
                )}
            </Box>
        </>
    );
}
