import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const { Router } = pkg;
import {
  getDetallesRecursos,
  getDetalleRecursoById,
  createDetalleRecurso,
  updateDetalleRecurso,
  deleteDetalleRecurso,
} from "../controllers/detalle_recurso.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

router.get("/get_detalles_recursos", getDetallesRecursos);
router.get("/get_detalle_recurso/:id", jwtCheck, getDetalleRecursoById);
router.post("/nuevo_detalle_recurso", createDetalleRecurso);
router.put("/editar_detalle_recurso/:id", updateDetalleRecurso);
router.delete("/eliminar_detalle_recurso/:id", deleteDetalleRecurso);

export default router;
