import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TablaEspacio = ({ columns, rows: initialRows, entityName }) => {
  const [rows, setRows] = useState(initialRows); // Inicialización de las filas
  const [searchValue, setSearchValue] = useState(""); // Valor del buscador
  const [filteredRows, setFilteredRows] = useState(initialRows); // Filas filtradas
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // Filtrar las filas según el valor del buscador
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = initialRows.filter(
      row => row.name.toLowerCase().includes(value) || row.status.toLowerCase().includes(value)
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

  const updateRow = (updatedRow) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
    setFilteredRows((prevFilteredRows) => prevFilteredRows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEditable(true);
    setOpenEditDialog(true);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setIsEditable(false);
    setOpenViewDialog(true);
  };

  const handleConfirmDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow.id));
    setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((row) => row.id !== selectedRow.id));
    handleDialogClose("delete");
  };

  const handleEditSubmit = () => {
    updateRow(selectedRow);
    handleDialogClose("edit");
    handleDialogClose("view");
  };

  const handleFieldChange = (field) => (event) => {
    setSelectedRow({ ...selectedRow, [field]: event.target.value });
  };

  const DynamicTextField = ({ columns, row, onChange, readOnly }) => (
    <>
      {columns
        .filter((col) => col.field !== "acciones")
        .map((col) => (
          <TextField
            key={col.field}
            margin="dense"
            label={col.headerName}
            fullWidth
            type={col.type === "number" ? "number" : "text"}
            value={row?.[col.field] || ""}
            onChange={onChange(col.field)}
            InputProps={{
              readOnly,
            }}
          />
        ))}
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
              <GridActionsCellItem
                key={`view-${params.id}`}
                icon={<VisibilityIcon />}
                label="Ver"
                onClick={() => handleViewClick(params.row)}
              />,
              <GridActionsCellItem
                key={`edit-${params.id}`}
                icon={<EditIcon />}
                label="Editar"
                onClick={() => handleEditClick(params.row)}
              />,
              <GridActionsCellItem
                key={`delete-${params.id}`}
                icon={<DeleteIcon />}
                label="Eliminar"
                onClick={() => handleDeleteClick(params.row)}
              />,
            ],
          },
        ]}
      />

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => handleDialogClose("delete")}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar {entityName} "{selectedRow?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose("delete")}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar */}
      <Dialog open={openEditDialog} onClose={() => handleDialogClose("edit")}>
        <DialogTitle>Editar {entityName}</DialogTitle>
        <DialogContent>
          <DynamicTextField columns={columns} row={selectedRow} onChange={handleFieldChange} readOnly={false} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose("edit")}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para visualizar */}
      <Dialog open={openViewDialog} onClose={() => handleDialogClose("view")}>
        <DialogTitle>Ver {entityName}</DialogTitle>
        <DialogContent>
          <DynamicTextField columns={columns} row={selectedRow} onChange={handleFieldChange} readOnly={!isEditable} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose("view")}>Salir</Button>
          {!isEditable && (
            <Button onClick={() => setIsEditable(true)} color="primary">
              Editar
            </Button>
          )}
          {isEditable && (
            <Button onClick={handleEditSubmit} color="primary">
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>
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

