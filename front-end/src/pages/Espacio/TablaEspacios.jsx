import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Inventory from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEspacio } from "../../context/espacioContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TablaEspacio = ({ columns, rows: espacios, entityName , onEdit, onAddRecurso}) => {
  const [rows, setRows] = useState(espacios); // Inicialización de las filas
  const [searchValue, setSearchValue] = useState(""); // Valor del buscador
  const [filteredRows, setFilteredRows] = useState(espacios); // Filas filtradas
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

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
  
  const {deleteEspacio} = useEspacio();

  //Para que cuando entre desde un link o recargue la pagina muestre los datos.
  useEffect(() => {
    setFilteredRows(espacios);
  }, [espacios]);
  

  // Filtrar las filas según el valor del buscador
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = espacios.filter(
      row => row.nombre.toLowerCase().includes(value) 
    );
    setFilteredRows(filtered);
  };

  const handleDialogClose = (dialogType) => {
    switch (dialogType) {
      case "delete":
        setOpenDeleteDialog(false);
        break;
      case "edit":
        setOpenEditDialog(false);
        break;
      case "view":
        setOpenViewDialog(false);
        break;
      default:
        break;
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setOpenViewDialog(true);
  };

  const handleConfirmDelete = async() => {
    try {
      const respuesta = await deleteEspacio(selectedRow.id);
      if (respuesta!="") {
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
        setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((row) => row.id !== selectedRow.id));
        handleDialogClose("delete");
        openSnackBar('El espacio se ha eliminado con éxito.', 'success');
      }else {
        openSnackBar('Hubo un error al eliminar el espacio.', 'error');
      }
      
    } catch (error) {
      console.error(error);
    }

  };

  const handleFieldChange = (field) => (event) => {
    setSelectedRow({ ...selectedRow, [field]: event.target.value });
  };

  const DynamicTextField = ({ columns, row, onChange, readOnly }) => (
    <>
      {columns
        .filter((col) => col.field !== "acciones")
        .map((col) => {
          const value = row?.[col.field];
          // Manejar campos que son objetos
          const displayValue =
            typeof value === "object" && value !== null
              ? value.nombre || JSON.stringify(value)
              : value;
  
          return (
            <TextField
              key={col.field}
              margin="dense"
              label={col.headerName}
              fullWidth
              type={col.type === "number" ? "number" : "text"}
              value={displayValue || ""}
              onChange={onChange(col.field)}
              InputProps={{
                readOnly,
              }}
            />
          );
        })}
    </>
  );
  

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <TextField
        placeholder="Buscar espacio"
        fullWidth
        value={searchValue}
        onChange={handleSearch}
      />
      <DataGrid
        rows={filteredRows} // Usar las filas filtradas
        columns={[
          ...columns,
          {
            field: "acciones",
            headerName: "Acciones",
            type: "actions",
            width: 200,
            getActions: (params) => [
              <>
      <Tooltip title="Asociar recursos" arrow>
        <GridActionsCellItem
          key={`view-${params.id}`}
          icon={<AddCircleOutlineIcon />}
          label="Asociar Recursos"
          onClick={() => onAddRecurso(params.row.id)}
        />
      </Tooltip>

      <Tooltip title="Ver detalles" arrow>
        <GridActionsCellItem
          key={`view-${params.id}`}
          icon={<VisibilityIcon />}
          label="Ver"
          onClick={() => handleViewClick(params.row)}
        />
      </Tooltip>

      <Tooltip title="Editar espacio" arrow>
        <GridActionsCellItem
          key={`edit-${params.id}`}
          icon={<EditIcon />}
          label="Editar"
          onClick={() => onEdit(params.row.id)}
        />
      </Tooltip>

      <Tooltip title="Eliminar espacio" arrow>
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDeleteClick(params.row)}
        />
      </Tooltip>
    </>,
            ],
          },
        ]}
      />

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => handleDialogClose("delete")}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar el {entityName}: "{selectedRow?.nombre}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose("delete")}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

{/* Diálogo para visualizar */}
<Dialog open={openViewDialog} onClose={() => handleDialogClose("view")}>
        <DialogTitle>Ver {entityName}</DialogTitle>
        <DialogContent>
          {/* Mostrar los detalles del espacio */}
          <DynamicTextField columns={columns} row={selectedRow} onChange={handleFieldChange} readOnly={!isEditable} />

          {/* Mostrar los recursos asociados */}
          <h3>Recursos asociados:</h3>
          {selectedRow?.detalleRecursosEspacio && selectedRow.detalleRecursosEspacio.length > 0 ? (
            <ul>
              {selectedRow.detalleRecursosEspacio.map((detalle, index) => {
                return (
                  <li key={index}>
                    <strong>{detalle.nombre}</strong> - Cantidad: {detalle.cantidad} <br />
                    <em>{detalle.descripcion}</em>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No hay recursos asociados.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleDialogClose("view")}>Salir</Button>
        </DialogActions>
      </Dialog>




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
};

// Validación de propiedades con PropTypes
TablaEspacio.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.array.isRequired,
  entityName: PropTypes.string.isRequired,
};

export default TablaEspacio;

