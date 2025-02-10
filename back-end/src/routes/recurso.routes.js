import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const { Router } = pkg;
import {
  getRecursos,
  getRecursoById,
  createRecurso,
  updateRecurso,
  deleteRecurso,
  incrementarDisponible,
} from "../controllers/recurso.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// router.get('/', authenticateToken, getUsers);
router.get("/get_recursos", jwtCheck, getRecursos);
router.get("/:id", getRecursoById);
router.post("/nuevo_recurso", jwtCheck, createRecurso);
router.patch("/editar_recurso/:id", jwtCheck, updateRecurso);
router.patch("/incrementar_disponible/:id", jwtCheck, incrementarDisponible);
router.delete("/eliminar_recurso/:id", jwtCheck, deleteRecurso);

export default router;
