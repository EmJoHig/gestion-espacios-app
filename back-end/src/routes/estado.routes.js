import pkg from "express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

import { getEstados } from "../controllers/estado.controller.js";

const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

router.get("/get_estados", jwtCheck, getEstados);

export default router;
