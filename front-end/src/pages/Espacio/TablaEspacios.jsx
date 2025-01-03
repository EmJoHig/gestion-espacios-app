import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

const TablaEspacio = ({ columns, initialRows, entityName }) => {
  const [rows, setRows] = useState(initialRows);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenEditDialog(true);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setOpenViewDialog(true);
    setIsEditable(false);
  };

  const handleConfirmDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedRow.id));
    setOpenDeleteDialog(false);
  };

  const handleEditSubmit = () => {
    setRows(rows.map((row) => (row.id === selectedRow.id ? selectedRow : row)));
    setOpenEditDialog(false);
    setOpenViewDialog(false);
  };

  const handleFieldChange = (field) => (event) => {
    setSelectedRow({ ...selectedRow, [field]: event.target.value });
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
            rows={rows}
            columns={[
                ...columns,
                {
                    field: 'acciones',
                    headerName: 'Acciones',
                    type: 'actions',
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
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          Estás seguro que desea eliminar {entityName} "{selectedRow?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar {entityName}</DialogTitle>
        <DialogContent>
          {columns
            .filter((col) => col.field !== 'actions')
            .map((col) => (
              <TextField
                key={col.field}
                margin="dense"
                label={col.headerName}
                fullWidth
                type={col.type === 'number' ? 'number' : 'text'}
                value={selectedRow?.[col.field] || ''}
                onChange={handleFieldChange(col.field)}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para visualizar */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
        <DialogTitle>Ver {entityName}</DialogTitle>
        <DialogContent>
          {columns
            .filter((col) => col.field !== 'actions')
            .map((col) => (
              <TextField
                key={col.field}
                margin="dense"
                label={col.headerName}
                fullWidth
                type={col.type === 'number' ? 'number' : 'text'}
                value={selectedRow?.[col.field] || ''}
                onChange={handleFieldChange(col.field)}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Salir</Button>
          <Button
            onClick={() => setIsEditable(true)}
            color="primary"
            disabled={isEditable}
          >
            Editar
          </Button>
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
  initialRows: PropTypes.array.isRequired,
  entityName: PropTypes.string.isRequired,
};

export default TablaEspacio;
