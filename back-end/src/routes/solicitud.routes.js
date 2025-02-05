import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
  getSolicitudes,
  getSolicitudesFilter,
  getSolicitudById,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
  cambiarEstadoSolicitud,
  getSolicitudesPorResponsable
} from "../controllers/solicitud.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

router.get('/get_solicitudes', jwtCheck, getSolicitudes);
router.get('/get_solicitudes_filter', jwtCheck, getSolicitudesFilter);
router.get('/get_solicitud/:id', jwtCheck, getSolicitudById);
router.post('/nueva_solicitud', jwtCheck, createSolicitud);
router.put('/editar_solicitud/:id', jwtCheck, updateSolicitud);
router.delete('/eliminar_solicitud/:id', jwtCheck, deleteSolicitud);
router.post('/cambiar_estado_solicitud', jwtCheck, cambiarEstadoSolicitud);
router.get('/get_solicitudes_por_responsable', jwtCheck, getSolicitudesPorResponsable);


export default router;
