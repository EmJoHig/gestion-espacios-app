import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
} from "../controllers/rol.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


router.get('/get_roles', jwtCheck, getRoles);
// router.get('/get_roles', getRoles);
router.get('/:id', getRolById);
router.post('/nuevo_rol', createRol);
router.put('/editar_rol/:id', updateRol);
router.delete('/eliminar_rol/:id', deleteRol);


export default router;
