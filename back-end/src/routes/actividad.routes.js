import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const { Router } = pkg;
import {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../controllers/actividad.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// router.get('/', authenticateToken, getUsers);
router.get("/get_actividades", jwtCheck, getActividades);
router.get("/:id", getActividadById);
router.post("/nueva_actividad", createActividad);
router.put("/editar_actividad/:id", updateActividad);
router.delete("/eliminar_actividad/:id", deleteActividad);

export default router;