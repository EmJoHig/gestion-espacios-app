import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const { Router } = pkg;
import {
  getActividades,
  // getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
  asociarActividadAMinisterio,
  getActividadesSinMinisterio,
  quitarActividadAMinisterio,
  bajaActividad,
  getActividadesBaja
} from "../controllers/actividad.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

router.get("/get_actividades", jwtCheck, getActividades);
// router.get("/:id", jwtCheck, getActividadById);
router.post("/nueva_actividad", jwtCheck, createActividad);
router.put("/editar_actividad/:id", jwtCheck, updateActividad);
router.delete("/eliminar_actividad/:id", jwtCheck, deleteActividad);
router.post("/asociar_actividad_a_ministerio", jwtCheck, asociarActividadAMinisterio);
router.get("/get_actividades_sin_ministerio", jwtCheck, getActividadesSinMinisterio);
router.post("/quitar_actividad_a_ministerio", jwtCheck, quitarActividadAMinisterio);
router.put('/baja_actividad/:id', jwtCheck, bajaActividad);
router.get('/get_actividades_baja',jwtCheck, getActividadesBaja);

export default router;
