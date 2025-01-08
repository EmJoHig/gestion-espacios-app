import { useEffect, useState } from "react";
import {useEstado} from "../../context/estadoContext";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl, FormHelperText
} from "@mui/material";

const FormularioEspacio = ({ onCancel, onSave }) => {

  const {estados,getEstados} = useEstado();
  // Con este useEffect ejecuto el metodo getEstados.
  useEffect(()=>{
    getEstados();
  },[]); // [] esto hace que se ejecute una sola vez.

  //console.log(estados);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    capacidad: "",
    id_estado: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.capacidad || formData.capacidad <= 0) {
      newErrors.capacidad = "La capacidad debe ser un número mayor a 0.";
    }

    if (!formData.id_estado) {
      newErrors.id_estado = "Debes seleccionar un estado.";
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (onSave) {
        onSave(formData); // Devuelve a EspacioPage en la funcion handleSave el formData
      }
      // Limpia el formulario
      setFormData({
        nombre: '',
        descripcion: '',
        capacidad: '',
        id_estado: ''
      });
      onCancel(); // Cierra el popup después de guardar
    }
  };

  return (
    
    <Box sx={{ mt: 2 }}>
  <TextField
    label="Nombre *"
    fullWidth
    value={formData.nombre}
    onChange={handleChange("nombre")}
    margin="normal"
    error={!!errors.nombre}
    helperText={errors.nombre}
  />
  <TextField
    label="Descripción (Opcional)"
    fullWidth
    multiline
    rows={3}
    value={formData.descripcion}
    onChange={handleChange("descripcion")}
    margin="normal"
    error={!!errors.descripcion}
    helperText={errors.descripcion}
  />
  <TextField
    label="Capacidad *"
    fullWidth
    type="number"
    value={formData.capacidad}
    onChange={handleChange("capacidad")}
    margin="normal"
    error={!!errors.capacidad}
    helperText={errors.capacidad}
  />
  <FormControl fullWidth margin="normal" error={!!errors.id_estado}>
    <InputLabel>Estado *</InputLabel>
    <Select
      value={formData.id_estado}
      onChange={handleChange("id_estado")}
      label="Estado *"
    >
      {estados.map((estado) => (
        <MenuItem key={estado.id} value={estado.id}>{estado.nombre}</MenuItem>
      ))}
    </Select>
    <FormHelperText>{errors.id_estado}</FormHelperText>
  </FormControl>
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
    <Button variant="outlined" onClick={onCancel} color="error">
      Cancelar
    </Button>
    <Button variant="contained" onClick={handleSave} color="primary">
      Guardar
    </Button>
  </Box>
</Box>

  );
};

export default FormularioEspacio;
