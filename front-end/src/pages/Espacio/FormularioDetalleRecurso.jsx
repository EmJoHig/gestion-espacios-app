import { useState, useEffect } from 'react';
import { Box, Autocomplete, Button, TextField, Grid, FormHelperText, FormControl } from '@mui/material';
import { useRecurso } from '../../context/recursoContext';
import CloseIcon from '@mui/icons-material/Close'; 
import { useEspacio } from '../../context/espacioContext';

const FormularioDetalleRecurso = ({ espacio, onCancel, onSave }) => {

  const [detalleRecursos, setDetalleRecursos] = useState([{ recursoId: '', cantidad: 1 }]);
  const { recursos, getRecursos } = useRecurso();
  const [errors, setErrors] = useState({});
  const {getDetallesRecursos} = useEspacio();

  // Acá obtengo todos los detallesRecursos del espacio.
  const detallesRecursos = getDetallesRecursos(espacio.id);
  console.log("Estos son los detallesRecursos del espacio:",detallesRecursos);

  useEffect(() => {
    getRecursos();
  }, []);

  const handleAddResource = () => {
    // Agregar un nuevo campo para seleccionar un recurso y cantidad
    setDetalleRecursos([...detalleRecursos, { recursoId: '', cantidad: 1 }]);
  };

  const handleRemoveResource = index => {
    // Eliminar un recurso de la lista
    const newDetalleRecursos = detalleRecursos.filter((_, i) => i !== index);
    setDetalleRecursos(newDetalleRecursos);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar cada recurso en detalleRecursos
    detalleRecursos.forEach((detalle, index) => {
      // Verificar si el recursoId está vacío
      if (!detalle.recursoId) {
        newErrors[`recursoId-${index}`] = "El recurso es obligatorio.";
      }

      // Verificar si la cantidad es válida
      if (!detalle.cantidad || detalle.cantidad <= 0) {
        newErrors[`cantidad-${index}`] = "La cantidad debe ser un número mayor a 0.";
      } else {
        // Validación del stock disponible
        const recurso = recursos.find(recurso => recurso.id === detalle.recursoId);
        if (recurso) {
          if (recurso.disponible === 0) {
            newErrors[`cantidad-${index}`] = "No hay stock disponible.";
          } else {
            // Sumar todas las cantidades de ese recurso
            const cantidadTotal = detalleRecursos
              .filter(item => item.recursoId === detalle.recursoId)
              .reduce((acc, item) => acc + parseInt(item.cantidad, 10), 0); // Sumar todas las cantidades del mismo recurso

            if (cantidadTotal > recurso.disponible) {
              newErrors[`cantidad-${index}`] = `Solo quedan ${recurso.disponible} unidades de ${recurso.nombre}.`;
            }
          }
        }
      }
    });

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    // Validar el formulario
    if (validateForm()) {
      // Eliminar "error" y agregar "espacioId" antes de enviar
      const recursosSinErrores = detalleRecursos.map(({ error, ...detalle }) => ({
        ...detalle,              // Conservamos las propiedades originales
        espacioId: espacio.id    // Agregamos el espacioId
      }));
  
      // Pasar los recursos sin el campo "error" a la función onSave
      onSave(recursosSinErrores);
  
      // Limpiar el formulario
      setDetalleRecursos([{ recursoId: '', cantidad: 1 }]);
  
      // Cerrar el modal o popup
      onCancel();
    }
  };
  
  return (
    <Box sx={{
      width: '95%', 
      margin:'0 auto'  // Esto centrará el Box horizontalmente
    }}>
      <h3>Agregar recursos a {espacio.nombre}</h3>
      {detalleRecursos.map((detalle, index) => (
        <Grid container spacing={1} key={index}>
          <Grid item xs={12} md={7.5}>
            <FormControl fullWidth>
              <Autocomplete
                value={recursos.find(recurso => recurso.id === detalle.recursoId) || null}
                onChange={(e, newValue) => {
                  const newDetalleRecursos = [...detalleRecursos];
                  newDetalleRecursos[index].recursoId = newValue ? newValue.id : '';
                  setDetalleRecursos(newDetalleRecursos);
                }}
                options={recursos}
                getOptionLabel={(option) => `${option.nombre} (${option.descripcion}) - Disponibles: ${option.disponible}`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Recurso" 
                    variant="outlined" 
                    required 
                    fullWidth 
                    error={!!errors[`recursoId-${index}`]} 
                  />
                )}
              />
              <FormHelperText error>{errors[`recursoId-${index}`]}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Cantidad"
              type="number"
              name="cantidad"
              value={detalle.cantidad}
              onChange={(e) => {
                const newDetalleRecursos = [...detalleRecursos];
                newDetalleRecursos[index].cantidad = e.target.value;
                setDetalleRecursos(newDetalleRecursos);
              }}
              fullWidth
              required
              min="1"
              error={!!errors[`cantidad-${index}`]} // Error si la cantidad es inválida
            />
            <FormHelperText error>{errors[`cantidad-${index}`]}</FormHelperText>
          </Grid>

          <Grid item xs={7} md={1}>
            <Button
              color="error"
              onClick={() => handleRemoveResource(index)}
              fullWidth
              startIcon={<CloseIcon />}  // Agregar el icono de cesto de basura
            >
            </Button>
          </Grid>
        </Grid>
      ))}

      {/* Botón "Agregar otro recurso" alineado a la izquierda con tamaño ajustado */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
        <Button variant="outlined" onClick={handleAddResource}>
          Agregar otro recurso
        </Button>
      </Box>

      <Box sx={{
        display: 'flex',            // Usamos Flexbox
        justifyContent: 'flex-end', // Alineamos los botones a la derecha
        gap: '10px',                // Espacio entre los botones
        marginTop: '30px'           // Espaciado superior
      }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onCancel}
          sx={{ width: 'auto' }}     // Asegura que el botón de "Cancelar" no ocupe todo el ancho
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: 'auto' }}     // Asegura que el botón de "Guardar" no ocupe todo el ancho
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioDetalleRecurso;