import pkg from 'express';
import express from 'express';
const { Router } = pkg;
import {
    getMinisterios,
    getMinisterioById,
    createMinisterio,
    updateMinisterio,
    deleteMinisterio,
} from "../controllers/ministerio.controller.js";

const router = express.Router();

// router.get('/', authenticateToken, getUsers);
router.get('/get_ministerios', getMinisterios);
router.get('/:id', getMinisterioById);
router.post('/nuevo_ministerio', createMinisterio);
router.put('/editar_ministerio/:id', updateMinisterio);
router.delete('/eliminar_ministerio/:id', deleteMinisterio);


export default router;
