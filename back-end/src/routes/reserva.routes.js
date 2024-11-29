import pkg from 'express';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const { Router } = pkg;
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
} from "../controllers/reserva.controller.js";

const router = express.Router();

const jwtCheck = auth({
    audience: 'https://gestion-espacios/api',
    issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

router.get('/get_reservas', getReservas);
router.get('/:id', getReservaById);
router.post('/nueva_reserva', createReserva);
router.put('/editar_reserva/:id', updateReserva);
router.delete('/eliminar_reserva/:id', deleteReserva);


export default router;
