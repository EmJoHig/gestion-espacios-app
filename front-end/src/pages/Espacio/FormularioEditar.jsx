import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEstado } from '../../context/estadoContext';
import axios from 'axios'; // Para las peticiones a la API
import { useEspacio } from '../../context/espacioContext';
import { useDetalleRecurso } from '../../context/detalleRecurso';
import { useRecurso } from '../../context/recursoContext';

const FormularioEditar = ({ espacio, onSave, onCancel, tipoEspacioList }) => {
  const [nombre, setNombre] = useState(espacio.nombre);
  const [descripcion, setDescripcion] = useState(espacio.descripcion);
  const [capacidad, setCapacidad] = useState(espacio.capacidad);
  const [id_estado, setEstado] = useState(espacio.estado.id);
  const [id_tipo_espacio, setTipoEspacio] = useState(espacio.tipoEspacio.id);
  const { estados, getEstados } = useEstado();
  const [errors, setErrors] = useState({});

  const [openDialog, setOpenDialog] = useState(false);
const [recursoAEliminar, setRecursoAEliminar] = useState(null);

  const {getDetallesRecursos} = useEspacio();
  const {deleteDetalleRecurso,updateDetalleRecurso} = useDetalleRecurso();
  const {incrementarDisponible} = useRecurso();

  // 📌 Estado para manejar los `detalleRecursos`
  const [detalleRecursos, setDetalleRecursos] = useState([]);


  // Estado para manejar la edición de un recurso
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
  const [cantidadRecurso, setCantidadRecurso] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    if (espacio.id) {
      console.log("Ejecutando cargarDetalleRecursos...");
      cargarDetalleRecursos();
    } else {
      console.log("No hay espacio.id disponible todavía");
    }
  }, [espacio.id]);
  

  useEffect(() => {
    setNombre(espacio.nombre);
    setDescripcion(espacio.descripcion);
    setCapacidad(espacio.capacidad);
    setEstado(espacio.estado.id);
    setTipoEspacio(espacio.tipoEspacio.id);
  }, [espacio]);

  const cargarDetalleRecursos = async () => {
    try {
      console.log("Llamando a getDetallesRecursos con espacioId:", espacio.id);
      const response = await getDetallesRecursos(espacio.id);
  
      console.log("Response completo de la API:", response);
  
      const datos = Array.isArray(response) ? response : response.data;
  
      if (Array.isArray(datos)) {
        const datosProcesados = datos.map((detalle) => ({
          id: detalle.id,
          cantidad: detalle.cantidad,
          recursoId: detalle.recursoId,
          recursoNombre: detalle.recurso ? detalle.recurso.nombre : "Desconocido",
          recursoDescripcion: detalle.recurso ? detalle.recurso.descripcion : "Sin descripción",
        }));
  
        setDetalleRecursos(datosProcesados);
        console.log("DetalleRecursos procesados:", datosProcesados);
      } else {
        setDetalleRecursos([]);
        console.log("API devolvió datos no esperados, seteando detalleRecursos como []");
      }
    } catch (error) {
      console.error("Error en cargarDetalleRecursos:", error);
      setDetalleRecursos([]);
    }
  };
  
  
  

  

  const validate = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!capacidad || capacidad <= 0) newErrors.capacidad = 'La capacidad debe ser un número mayor a 0.';
    if (!id_estado) newErrors.id_estado = 'Debe seleccionar un estado.';
    if (!id_tipo_espacio) newErrors.id_tipo_espacio = 'Debe seleccionar un tipo de espacio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const espacioEditado = {
      id: espacio.id,
      nombre,
      descripcion,
      capacidad: parseInt(capacidad, 10),
      id_estado,
      id_tipo_espacio,
    };
    onSave(espacioEditado);
  };

  // 📌 Función para abrir el modal y editar un `detalleRecurso`
  const abrirModal = (detalle) => {
    setRecursoSeleccionado(detalle);
    setCantidadRecurso(detalle.cantidad);
    setModalAbierto(true);
  };

  // 📌 Función para guardar cambios en un `detalleRecurso`
  const guardarRecurso = async () => {
    try {

      const data = {
        idDetalle: recursoSeleccionado.id, // ID del detalle recurso
        idRecurso: recursoSeleccionado.recursoId, // ID del recurso asociado
        cantidad: cantidadRecurso, // Nueva cantidad asignada
      };

      await updateDetalleRecurso(data);
      setDetalleRecursos(
        detalleRecursos.map((d) =>
          d.id === recursoSeleccionado.id ? { ...d, cantidad: cantidadRecurso } : d
        )
      );
      setModalAbierto(false);
    } catch (error) {
      console.error('Error actualizando detalleRecurso:', error);
    }
  };

  const confirmarEliminacion = (detalle) => {
    setRecursoAEliminar(detalle);
    console.log("cantidad a eliminar",detalle.cantidad);
    setOpenDialog(true);
  };
  

  // 📌 Función para eliminar un `detalleRecurso`
  const eliminarRecursoConfirmado = async () => {
    if (!recursoAEliminar) return;
    try {
      await deleteDetalleRecurso(recursoAEliminar.id);
      
      const datosActualizacion = {
        id: recursoAEliminar.recursoId, // ID del recurso
        sumar: recursoAEliminar.cantidad, // Cantidad eliminada que se debe sumar
      };
  
      // 3️⃣ Llamar a la API con el nuevo objeto
      await incrementarDisponible(datosActualizacion);
      setDetalleRecursos(detalleRecursos.filter((d) => d.id !== recursoAEliminar.id));
      setOpenDialog(false);
      setRecursoAEliminar(null);
    } catch (error) {
      console.error("Error eliminando detalleRecurso:", error);
    }
  };
  

  return (
    <Box sx={{ mt: 2 }}>
      <TextField label="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth margin="normal" error={!!errors.nombre} helperText={errors.nombre} />
      <TextField label="Descripción (Opcional)" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} fullWidth margin="normal" multiline rows={3} />
      <TextField label="Capacidad *" type="number" value={capacidad} onChange={(e) => setCapacidad(e.target.value)} fullWidth margin="normal" error={!!errors.capacidad} helperText={errors.capacidad} />

      <FormControl fullWidth margin="normal" error={!!errors.id_estado}>
        <InputLabel>Estado *</InputLabel>
        <Select value={id_estado} onChange={(e) => setEstado(e.target.value)} label="Estado *">
          {estados.map((estado) => (
            <MenuItem key={estado.id} value={estado.id}>
              {estado.nombre}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.id_estado}</FormHelperText>
      </FormControl>

      {/* 📌 TABLA DE detalleRecursos */}
      <h3>📌 Recursos Asociados</h3>
      {Array.isArray(detalleRecursos) && detalleRecursos.length > 0 ? (
  <TableContainer component={Paper} sx={{ mb: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Recurso</TableCell>
          <TableCell>Descripción</TableCell> {/* Nueva columna */}
          <TableCell>Cantidad</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {detalleRecursos.map((detalle) => (
          <TableRow key={detalle.id}>
            <TableCell>{detalle.recursoNombre}</TableCell>
            <TableCell>{detalle.recursoDescripcion}</TableCell> {/* Mostrar descripción */}
            <TableCell>{detalle.cantidad}</TableCell>
            <TableCell>
              <Button onClick={() => abrirModal(detalle)} color="primary">
                ✏️ Editar
              </Button>
              <Button onClick={() => confirmarEliminacion(detalle)} color="error">
  🗑️ Eliminar
</Button>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <p>No hay recursos asociados.</p>
)}

<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Eliminar Recurso</DialogTitle>
  <DialogContent>
    <p>¿Estás seguro de que quieres eliminar "{recursoAEliminar?.recursoNombre}"?</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="primary">
      Cancelar
    </Button>
    <Button onClick={eliminarRecursoConfirmado} color="error" variant="contained">
      Eliminar
    </Button>
  </DialogActions>
</Dialog>



      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onCancel} variant="outlined" color="error">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </Box>

      {/* 📌 MODAL PARA EDITAR RECURSO */}
      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)}>
        <DialogTitle>Editar Recurso</DialogTitle>
        <DialogContent>
          <TextField label="Cantidad" type="number" value={cantidadRecurso} onChange={(e) => setCantidadRecurso(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalAbierto(false)}>Cancelar</Button>
          <Button onClick={guardarRecurso} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormularioEditar;
