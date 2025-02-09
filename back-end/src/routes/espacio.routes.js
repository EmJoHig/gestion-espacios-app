import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const { Router } = pkg;
import {
  getEspacios,
  getEspacioById,
  createEspacio,
  updateEspacio,
  deleteEspacio,
  getTiposEspacio,
} from "../controllers/espacio.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

router.get("/get_espacios", getEspacios);
router.get("/get_espacio/:id", jwtCheck, getEspacioById);
router.post("/nuevo_espacio", createEspacio);
router.put("/editar_espacio/:id", updateEspacio);
router.delete("/eliminar_espacio/:id", deleteEspacio);
router.get("/get_tipos_espacio", getTiposEspacio);

export default router;
