import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
    getRolesPorUsuario,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
    asociarRolAlUsuario,
    getRolesAUTH0
} from "../controllers/rol.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


router.get('/get_roles_por_usuario', jwtCheck, getRolesPorUsuario);
router.get('/get_roles_auth0', jwtCheck, getRolesAUTH0);

// router.get('/get_roles', getRoles);
router.get('/:id', getRolById);
router.post('/nuevo_rol', jwtCheck, createRol);
router.put('/editar_rol/:id', jwtCheck, updateRol);
router.delete('/eliminar_rol/:id', jwtCheck, deleteRol);

router.post('/asociar_rol_usuario', jwtCheck, asociarRolAlUsuario);

export default router;
