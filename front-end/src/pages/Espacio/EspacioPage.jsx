import Box from '@mui/material/Box';
import { Button, TextField, Typography } from "@mui/material";
import TablaEspacio from "./TablaEspacios";
import './EspacioPage.css';

// Datos de prueba, nombres de las columnas
const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'capacity', headerName: 'Capacidad', type: 'number', width: 150 },
    { field: 'status', headerName: 'Estado', width: 150 },
  ];
  // Datos prueba que tendria que recuperar a traves del endpoint /espacios.
  const initialRows = [
    { id: 1, name: 'Sala de Reuniones', capacity: 10, status: 'Disponible' },
    { id: 2, name: 'Auditorio', capacity: 50, status: 'En Uso' },
    { id: 3, name: 'Oficina Privada', capacity: 5, status: 'En Mantenimiento' },
  ];

export function EspacioPage (){
    return(

        <Box>
        {/* Título */}
        <Box mb={2} mt={2}>
            <Typography className="title" variant="h3">Espacios</Typography>
        </Box>
    
        {/* Buscador */}
        <Box mb={2}>
            <TextField name="espacio" placeholder="Buscar espacio" fullWidth />
        </Box>
    
        {/* Botón */}
        <Box mb={2}>
            <Button variant="contained">+ Nuevo espacio</Button>
        </Box>

        {/* Tabla */}
        <Box mb={2}>
                <TablaEspacio
                    columns={columns}
                    initialRows={initialRows}
                    entityName="Espacio" 
                />
        </Box>
    </Box>
    

        

    );
}
