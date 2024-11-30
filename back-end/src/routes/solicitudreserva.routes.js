import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
  getSolicitudesReservas,
  getSolicitudReservaById,
  createSolicitudReserva,
  updateSolicitudReserva,
  deleteSolicitudReserva
} from "../controllers/solicitudreserva.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

router.get('/get_solicitudReservas', getSolicitudesReservas);
router.get('/:id', getSolicitudReservaById);
router.post('/nueva_solicitudReserva', createSolicitudReserva);
router.put('/editar_solicitudReserva/:id', updateSolicitudReserva);
router.delete('/eliminar_solicitudReserva/:id', deleteSolicitudReserva);


export default router;
