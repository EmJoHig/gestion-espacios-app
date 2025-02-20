import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
    getMinisterios,
    getMinisterioById,
    createMinisterio,
    updateMinisterio,
    deleteMinisterio,
    asociarResponsableAMinist,
    getActividadesPorMinisterio,
    bajaMinisterio,
    getMinisteriosBaja
} from "../controllers/ministerio.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


// router.get('/', authenticateToken, getUsers);
router.get('/get_ministerios',jwtCheck, getMinisterios);
router.get('/get_ministerio_por_id/:id', jwtCheck, getMinisterioById);
router.post('/nuevo_ministerio', jwtCheck, createMinisterio);
router.put('/editar_ministerio/:id', jwtCheck, updateMinisterio);
router.delete('/eliminar_ministerio/:id', jwtCheck, deleteMinisterio);
router.post('/asociar_responsable_ministerio', jwtCheck, asociarResponsableAMinist);
router.get('/get_actividades_de_ministerio', jwtCheck, getActividadesPorMinisterio);
router.put('/baja_ministerio/:id', jwtCheck, bajaMinisterio);
router.get('/get_ministerios_baja',jwtCheck, getMinisteriosBaja);

export default router;
