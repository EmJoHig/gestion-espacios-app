import pkg from 'express';
import express from 'express';
const { Router } = pkg;
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// router.get('/', authenticateToken, getUsers);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/editar-usuario/:id', updateUser);
router.delete('/eliminar-usuario/:id', deleteUser);


export default router;
