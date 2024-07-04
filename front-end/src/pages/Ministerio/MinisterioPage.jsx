import * as React from 'react';
import { useEffect } from "react";
import { ImFileEmpty } from "react-icons/im";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
import TablaGenerica from '../../components/TablaGenerica';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export function MinisterioPage() {

    useEffect(() => {
    }, []);

    const data = [
        { id: 1, codigo: 'M1', descripcion: 'MINISTERIO 1' },
        { id: 2, codigo: 'M2', descripcion: 'MINISTERIO DOS' },
        { id: 3, codigo: 'M3', descripcion: 'MINISTERIO TRES' },
        { id: 4, codigo: 'M4', descripcion: 'MINISTERIO CUATRO' },
    ];

    const [age, setAge] = React.useState('');

    const ChangeSelectMuni = (event) => {
        setAge(event.target.value);
    };


    const columnas = [
        {
            id: 'codigo',
            numeric: false,
            disablePadding: true,
            label: 'Codigo',
        },
        {
            id: 'descripcion',
            numeric: true,
            disablePadding: false,
            label: 'Descripcion',
        },
        {
            id: 'accion',
            numeric: true,
            disablePadding: false,
            label: 'Accion',
        },
    ];



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function RenderizarDialog(props) {
        // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columnasTablaParam } =
        //     props;
        // const createSortHandler = (property) => (event) => {
        //     onRequestSort(event, property);
        // };

        return (
            <>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Nuevo Ministerio</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            type="test"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Guardar</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }


    return (
        <>
            <Box sx={{ marginTop: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Modulo Ministerios
                </Typography>

                <Button variant="contained" onClick={handleClickOpen}>Nuevo</Button>
                <RenderizarDialog />
                <TablaGenerica data={data} columnasTabla={columnas} nombreTabla={"Listado de Ministerios"} />
            </Box>
        </>
    );
}
