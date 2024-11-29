import express from "express";
import pkg from "express";
import { auth } from "express-oauth2-jwt-bearer";

// import pkg from 'express-openid-connect';
// const { requiresAuth } = pkg;

const { Router } = pkg;
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
const router = express.Router();

const jwtCheck = auth({
  audience: "https://gestion-espacios/api",
  issuerBaseURL: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// router.get('/', authenticateToken, getUsers);
router.get("/get_usuarios", jwtCheck, getUsers);
router.get("/get_usuario/:id", jwtCheck, getUserById);
router.patch("/editar-usuario/:id", jwtCheck, updateUser);
router.delete("/eliminar-usuario/:id", jwtCheck, deleteUser);

// router.get('/perfil-usuario', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

export default router;
