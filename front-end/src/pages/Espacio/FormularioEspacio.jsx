import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const FormularioEspacio = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    capacidad: "",
    estado: "Disponible",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose(); // Cierra el popup después de guardar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar nuevo Espacio</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            fullWidth
            value={formData.nombre}
            onChange={handleChange("nombre")}
            margin="normal"
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            value={formData.descripcion}
            onChange={handleChange("descripcion")}
            margin="normal"
          />
          <TextField
            label="Capacidad"
            fullWidth
            type="number"
            value={formData.capacidad}
            onChange={handleChange("capacidad")}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              value={formData.estado}
              onChange={handleChange("estado")}
              label="Estado"
            >
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="En Mantenimiento">En Mantenimiento</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioEspacio;
