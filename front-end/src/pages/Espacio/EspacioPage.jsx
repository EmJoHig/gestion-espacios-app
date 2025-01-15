import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from "@mui/material";
import TablaEspacio from "./TablaEspacios";
import { useNavigate } from 'react-router-dom';
import FormularioEspacio from './FormularioEspacio';
import { useEspacio,EspacioProvider } from '../../context/espacioContext';
import { EstadoProvider } from "../../context/estadoContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormularioEditar from './FormularioEditar';

// Datos de de columnas
const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
    { field: 'capacidad', headerName: 'Capacidad', type: 'number', width: 150 },
    { field: 'estado', headerName: 'Estado',width: 150, renderCell: (params) => params.row.estado.nombre }, // Me permite acceder solo al nombre del objeto EstadoEspacio
];

export function EspacioPage() {

    const [openCrearDialog, setOpenCrearDialog] = useState(false); // Lo utilizo para abrir el dialogo con el formulario Crear.
    const [openEditDialog, setOpenEditDialog] = useState(false); // Lo utilizo para abrir el dialogo con el formulario Editar.
    const [selectedEspacio, setSelectedEspacio] = useState(null); // Lo uso para buscar el espacio seleccionado a Editar.

    const { espacios, getEspacios, createEspacio, updateEspacio } = useEspacio(); // Variables y metodos del espacioContext.
    
    // useEffect es un hook que se usa para hacer llamada a APIs y se ejecuta una sola vez al renderizar el componenete.
    useEffect(()=> {
            getEspacios(); // getEspacios es un metodo de espacioContext que hace la llamada a la api y guarda los datos obtenidos en espacios.
    },[]);

    const navigate = useNavigate();

    // Funcion que redirige al home.
    const backHome = () => {
        navigate("/home");
      };

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

      
    // Funcion que se ejecuta al apretar el boton guardar de crear Espacio-
    const handleSave = async (data) => {
        try {
            const respCreate = await createEspacio(data);
            if (respCreate != "") {
                openSnackBar('El espacio se ha creado con éxito.', 'success');
                getEspacios(); // Muestro la tabla actualizada con el ultimo espacio agregado.
                
            } else {
                openSnackBar('Error al crear el espacio.', 'error');
            }
        } catch (error) {
            console.error("Failed to create: ", error);
        }
        
    };


    // Funcion que se ejecuta al clickear el boton editar de la tabla. La orden viene directamente de TablaEspacio.
    const handleEdit = (id) => {
        const espacioSeleccionado = espacios.find((espacio) => espacio.id === id);
        setSelectedEspacio(espacioSeleccionado); // Guarda el espacio seleccionado.
        setOpenEditDialog(true); // Abre el diálogo-
    };

    // Función para manejar el guardado de la edición.
    const handleSaveEdit = async (editedEspacio) => {
        console.log(editedEspacio);
        try {
            const respUpdate = await updateEspacio(editedEspacio);
            if (respUpdate !== "") {
                openSnackBar('El espacio se ha editado con éxito.', 'success');
                getEspacios(); // Recargar los espacios después de editar
                setOpenEditDialog(false); // Cierra el diálogo
            } else {
                openSnackBar('Error al editar el espacio.', 'error');
            }
        } catch (error) {
            console.error("Failed to update: ", error);
            openSnackBar('Error al editar el espacio.', 'error');
        }
    };


    return (
        <Box>
            {/* Título */}
            <Box mb={2} mt={2}>
                <Typography className="title" variant="h3">Espacios</Typography>
            </Box>
        
            {/* Botón */}
            <Box mb={2} display="flex" gap={2}>
                <Button variant="contained" onClick={backHome}>
                    Home
                </Button>
                <Button variant="contained" onClick={()=>setOpenCrearDialog(true)}>
                    + Nuevo espacio
                </Button>

                {/* Formulario de creación dentro de un diálogo */}
                <Dialog open={openCrearDialog} onClose={() => setOpenCrearDialog(false)}>
                        <DialogTitle>Agregar Nuevo Espacio</DialogTitle>
                        <DialogContent>
                            <EstadoProvider>
                            <FormularioEspacio onCancel={() => setOpenCrearDialog(false)} onSave={handleSave}/>
                            </EstadoProvider>
                        </DialogContent>
                    </Dialog>
                
                {/* Formulario de edición dentro de un diálogo */}
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogTitle>Editar Espacio</DialogTitle>
                        <DialogContent>
                        {selectedEspacio && (
                            <EstadoProvider>
                                <FormularioEditar espacio={selectedEspacio} onSave={handleSaveEdit} onCancel={() => setOpenEditDialog(false)}/>
                            </EstadoProvider>    
                        )}
                        </DialogContent>
                    </Dialog>   
            </Box>

            {/* Tabla */}
            <Box mb={2}>
                <EspacioProvider>
                    <TablaEspacio
                    columns={columns}
                    rows={espacios}
                    entityName="Espacio"
                    onEdit={handleEdit}
                    />
                </EspacioProvider>
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
        </Box>
        
        
    );
}
