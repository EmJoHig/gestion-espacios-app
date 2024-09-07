import express from 'express';
import pkg from 'express';


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

// router.get('/', authenticateToken, getUsers);
router.get('/get_usuarios', getUsers);
router.get('/get_usuario/:id', getUserById);
router.patch('/editar-usuario/:id', updateUser);
router.delete('/eliminar-usuario/:id', deleteUser);

// router.get('/perfil-usuario', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });


export default router;
