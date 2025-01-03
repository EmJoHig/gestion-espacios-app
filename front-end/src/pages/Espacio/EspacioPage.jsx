import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import TablaEspacio from "./TablaEspacios";
import { useNavigate } from 'react-router-dom';
import FormularioEspacio from './FormularioEspacio';



// Datos de prueba, nombres de las columnas
const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'capacity', headerName: 'Capacidad', type: 'number', width: 150 },
    { field: 'status', headerName: 'Estado', width: 150 },
];

// Datos de prueba iniciales
const initialRows = [
    { id: 1, name: 'Sala de Reuniones', description:'Esta es una sala de reuniones amplia', capacity: 10, status: 'Disponible' },
    { id: 2, name: 'Auditorio', description:'Esto es un auditorio para musicos', capacity: 50, status: 'En Uso' },
    { id: 3, name: 'Oficina Privada', description:'Esto es una oficina pequeña', capacity: 5, status: 'En Mantenimiento' },
];

export function EspacioPage() {
    
    const navigate = useNavigate();

    const backHome = () => {
        navigate("/");
      };

      const [openForm, setOpenForm] = useState(false);

      const handleOpen = () => setOpenForm(true);
      const handleClose = () => setOpenForm(false);
    
      const handleSave = (data) => {
        console.log("Datos guardados:", data);
        // Aquí puedes manejar la lógica para guardar los datos
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
                <Button variant="contained" onClick={handleOpen}>
                    + Nuevo espacio
                </Button>
                <FormularioEspacio
                    open={openForm}
                    onClose={handleClose}
                    onSave={handleSave}
                />
            </Box>

            {/* Tabla */}
            <Box mb={2}>
            <TablaEspacio
                columns={columns}
                rows={initialRows}
                entityName="Espacio"
                />
            </Box>
        </Box>
    );
}
