import React, { useState } from 'react';
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
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ReservaDialog({ open, onClose, onSave, ministerios, actividades, espacios, selectedDate  }) {
      // Estados para los selectores
  const [selectedMinisterio, setSelectedMinisterio] = useState('');
  const [selectedActividad, setSelectedActividad] = useState('');
  const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
  const [selectedEspacio, setSelectedEspacio] = useState('');
  const [valueFecha, setValueFecha] = useState(null);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  

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


  const handleSubmit = (event) => {
    event.preventDefault();
    const reserva = {
      espacioId: selectedEspacio,
      ministerioId: selectedMinisterio,
      actividadId: selectedActividad,
      fecha: valueFecha,
      horaInicio,
      horaFin,
    };
    console.log("1-Reserva enviada:", reserva);
    onSave(reserva);
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Nueva Reserva</DialogTitle>
      <DialogContent>
                            {/* Selector de Ministerios */}
                            <FormControl fullWidth margin="normal">
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
                    <FormControl fullWidth margin="normal" disabled={!selectedMinisterio}>
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

        <FormControl fullWidth margin="normal">
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
            <Typography>Fecha de Reserva</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Seleccionar Día" value={valueFecha} onChange={setValueFecha} fullWidth
                    InputLabelProps={{
                        shrink: true
                    }} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Typography>Hora de Inicio</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Hora Inicio"
                value={horaInicio}
                onChange={(newValue) => {
                  setHoraInicio(newValue);
                  setHoraFin(newValue?.add(1, 'hour'));
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Typography>Hora de Fin</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Hora Fin" value={horaFin} onChange={setHoraFin} />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
