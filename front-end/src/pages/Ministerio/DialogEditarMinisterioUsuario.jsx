import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import img1 from '../../assets/municipalidad.jpg';
import img2 from '../../assets/responsables.jpg';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TablaGenerica from '../../components/TablaGenerica';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

import EditIcon from '@mui/icons-material/Edit';
import { useUsuario } from "../../context/usuarioContext";


function DialogEditarRolUsuario({ usuario, open, onClose, onSubmit, ministerios, idMinisterioSelect, setMinisterioSelect }) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const ministerioIdValue = formJson.ministerioId;
                    onSubmit(ministerioIdValue);
                },
            }}
        >
            <DialogTitle>Asociar ministerio a Usuario</DialogTitle>
            <br/>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '100%', marginBottom: 2 }} variant="standard">
                            <Select
                                value={idMinisterioSelect}
                                onChange={(e) => setMinisterioSelect(e.target.value)}
                                name="ministerioId"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                endAdornment={
                                    ministerios.length > 0 && (
                                      <InputAdornment sx={{ marginRight: "10px" }} position="end">
                                        <IconButton
                                          onClick={() => {
                                            setMinisterioSelect("");
                                          }}
                                        >
                                          <ClearIcon></ClearIcon>
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                  }
                            >
                                {ministerios.map((min) => (
                                    <MenuItem key={min.id} value={min.id}>{min.descripcion}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Guardar Edicion</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogEditarRolUsuario;
