import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, FormHelperText } from '@mui/material';
import { useEstado } from '../../context/estadoContext';

const FormularioEditar = ({ espacio, onSave, onCancel }) => {
  const [nombre, setNombre] = useState(espacio.nombre);
  const [descripcion, setDescripcion] = useState(espacio.descripcion);
  const [capacidad, setCapacidad] = useState(espacio.capacidad);
  const [id_estado, setEstado] = useState(espacio.estado.id); // Suponiendo que 'estado' es un objeto con 'id' y 'nombre'

  const { estados, getEstados } = useEstado();

  // Estado para manejar errores
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getEstados();
  }, []);

  useEffect(() => {
    setNombre(espacio.nombre);
    setDescripcion(espacio.descripcion);
    setCapacidad(espacio.capacidad);
    setEstado(espacio.estado.id); // Si el espacio ya tiene un estado, lo carga
  }, [espacio]);

  // Función para validar los campos
  const validate = () => {
    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!capacidad || capacidad <= 0) newErrors.capacidad = 'La capacidad debe ser un número mayor a 0.';
    if (!id_estado) newErrors.id_estado = 'Debe seleccionar un estado.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const espacioEditado = {
      id: espacio.id,
      nombre,
      descripcion,
      capacidad: parseInt(capacidad, 10), // Aseguramos que capacidad sea un número
      id_estado,
    };
    onSave(espacioEditado);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Nombre *"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.nombre}
        helperText={errors.nombre}
      />

      <TextField
        label="Descripción (Opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      <TextField
        label="Capacidad *"
        type="number"
        value={capacidad}
        onChange={(e) => setCapacidad(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.capacidad}
        helperText={errors.capacidad}
      />

      <FormControl fullWidth margin="normal" error={!!errors.id_estado}>
        <InputLabel>Estado *</InputLabel>
        <Select
          value={id_estado}
          onChange={(e) => setEstado(e.target.value)}
          label="Estado *"
        >
          {estados.map((estado) => (
            <MenuItem key={estado.id} value={estado.id}>
              {estado.nombre}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.id_estado}</FormHelperText>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} variant="outlined" color="error">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioEditar;

