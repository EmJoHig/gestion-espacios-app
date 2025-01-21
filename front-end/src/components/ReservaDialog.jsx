import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { Close } from '@mui/icons-material';


export default function ReservaDialog({ open, onClose, onSave, ministerios, actividades, espacios, selectedDate, errorMessage, isEditing }) {
      // Estados para los selectores
  const [selectedMinisterio, setSelectedMinisterio] = useState('');
  const [selectedActividad, setSelectedActividad] = useState('');
  const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
  const [selectedEspacio, setSelectedEspacio] = useState('');
  const [fechaHoraInicio, setFechaHoraInicio] = useState(null);
  const [fechaHoraFin, setFechaHoraFin] = useState(null);
  const [editable, setEditable] = useState(false); // Controla si los campos están habilitados


  useEffect(() => {
    if (selectedDate) {
      // Precargamos los valores del formulario con los datos de la reserva seleccionada
      // console.log("Dialog - selectedDate: ",selectedDate)
      // console.log("dayjs selctdDate.fechaInicio", dayjs(selectedDate.fechaInicio))
      setSelectedMinisterio(selectedDate.ministerioId || ""); // Ajusta según tu estructura
      setSelectedActividad(selectedDate.actividadId || "");
      setSelectedEspacio(selectedDate.espacioId || "");
      setFechaHoraInicio(selectedDate.fechaInicio ? dayjs(selectedDate.fechaInicio) : null);
      setFechaHoraFin(selectedDate.fechaFin ? dayjs(selectedDate.fechaFin) : null);
  
      if (selectedDate.ministerioId) {
        const actividadesRelacionadas = actividades.filter(
          (actividad) => actividad.ministerioId === selectedDate.ministerioId
        );
        setActividadesFiltradas(actividadesRelacionadas);
      }
    }
  }, [selectedDate, actividades]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const reserva = {
      id: selectedDate?.id,
      ministerioId: selectedMinisterio,
      actividadId: selectedActividad,
      espacioId: selectedEspacio,
      fechaHoraInicio: fechaHoraInicio ? fechaHoraInicio.toISOString() : null,
      fechaHoraFin: fechaHoraFin ? fechaHoraFin.toISOString() : null,
    };
    onSave(reserva);
    //onClose()
    setEditable(false); // Bloquea campos nuevamente tras guardar
  };

  const handleModify = () => {
    setEditable(true); // Habilita campos para edición
  };

  const handleClose = () => {
    onClose();
    setEditable(false);
  };
  
  // console.log("isEditing", isEditing)
  // console.log("editable", editable)

  const handleFechaHoraInicioChange = (newValue) => {
    if (newValue && newValue.isValid()) {  // Verifica si el nuevo valor es válido
      setFechaHoraInicio(newValue);
  
      // Si se selecciona una fecha y hora de inicio, establecemos la fecha y hora de fin como una hora más
      const nuevaFechaHoraFin = newValue.add(1, 'hour'); // Sumar 1 hora
      setFechaHoraFin(nuevaFechaHoraFin);
    } else {
      console.log("Fecha de inicio inválida");
    }
  };
  

  const handleEspacioChange = (event) => {
    setSelectedEspacio(event.target.value);
  };


  const handleActividadChange = (event) => {
    setSelectedActividad(event.target.value);
  };

     // Manejar el cambio en el selector de ministerios
  const handleMinisterioChange = (event) => {
    const selectedId = event.target.value;
    console.log("aca: ", selectedId)
    setSelectedMinisterio(selectedId);
    // Filtrar actividades relacionadas con el ministerio seleccionado
    const actividadesRelacionadas = actividades.filter((actividad) => actividad.ministerioId === selectedId);
    setActividadesFiltradas(actividadesRelacionadas);
    setSelectedActividad(''); // Reiniciar actividad seleccionada
    console.log("act: ",actividadesRelacionadas)
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>{isEditing ? (editable ? "Editar Reserva" : "Visualizar Reserva") : "Crear Nueva Reserva"}</DialogTitle>
      {errorMessage && (
                        <Typography color="error" variant="body2" style={{ marginBottom: '10px' }}>
                            {errorMessage}
                        </Typography>
                    )}
      <DialogContent>
                            {/* Selector de Ministerios */}
                            <FormControl fullWidth margin="normal" disabled={isEditing && !editable}>
                        <InputLabel id="ministerio-label">Ministerio</InputLabel>
                        <Select
                            labelId="ministerio-label"
                            value={selectedMinisterio}
                            onChange={handleMinisterioChange}
                        >
                            {ministerios.map((ministerio) => (
                                <MenuItem key={ministerio.id} value={ministerio.id}>
                                    {ministerio.codigo} - {ministerio.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Selector de Actividades */}
                    <FormControl fullWidth margin="normal" disabled={(isEditing && !editable) || !selectedMinisterio}>
                        <InputLabel id="actividad-label">Actividad</InputLabel>
                        <Select
                            labelId="actividad-label"
                            value={selectedActividad}
                            onChange={handleActividadChange}
                        >
                            {actividadesFiltradas.map((actividad) => (
                                <MenuItem key={actividad.id} value={actividad.id}>
                                    {actividad.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Selector de Espacios */}

        <FormControl fullWidth margin="normal" disabled={isEditing && !editable}>
          <InputLabel id="espacio-label">Espacio</InputLabel>
          <Select
            labelId="espacio-label"
            value={selectedEspacio}
            onChange={handleEspacioChange}
          >
            {espacios.map((espacio) => (
              <MenuItem key={espacio.id} value={espacio.id}>
                {espacio.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Seleccionar Fecha y Hora de Inicio"
                value={fechaHoraInicio}
                onChange={handleFechaHoraInicioChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={isEditing && !editable}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Seleccionar Fecha y Hora de Fin"
                value={fechaHoraFin}
                onChange={setFechaHoraFin}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={isEditing && !editable}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      {!isEditing || editable ? <span/> : (
          <Button onClick={handleModify} type="button">Modificar</Button>
        )}
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isEditing && !editable}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
