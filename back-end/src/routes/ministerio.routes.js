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
    asociarResponsableAMinist
} from "../controllers/ministerio.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


// router.get('/', authenticateToken, getUsers);
router.get('/get_ministerios', jwtCheck, getMinisterios);
router.get('/:id', getMinisterioById);
router.post('/nuevo_ministerio', createMinisterio);
router.put('/editar_ministerio/:id', updateMinisterio);
router.delete('/eliminar_ministerio/:id', deleteMinisterio);
router.post('/asociar_responsable_ministerio', jwtCheck, asociarResponsableAMinist);

export default router;
