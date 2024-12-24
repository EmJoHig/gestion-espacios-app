import Recurso from '../models/Recurso.js';
import bcrypt from "bcryptjs";


export const getRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.findAll();
        
        res.status(200).json(recursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los usuarios' });
    }
};

export const getRecursoById = async (req, res) => {
    try {
        const { id } = req.params;

        const recurso = await Recurso.findByPk(id);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        res.status(200).json(recurso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Recurso' });
    }
};


export const createRecurso = async (req, res) => {
    try {

        const { nombre, descripcion, cantidad } = req.body;

        const nuevoRecurso = await Recurso.create({
            nombre,
            descripcion,
            cantidad
        });

        res.status(200).json(nuevoRecurso);     
    } catch (error) {
        console.error('Error al crear el recurso:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Recurso' });
    }
};


export const updateRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, cantidad } = req.body;

        const recurso = await Recurso.findByPk(id);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = recurso.id;
        if (nombre) updates.nombre = nombre;
        if (descripcion) updates.descripcion = descripcion;
        if (cantidad) updates.cantidad = cantidad;

        await Recurso.update(updates, {
            where: { id: id }
        });

        res.status(200).json(recurso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Recurso' });
    }
};

export const deleteRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.destroy({
            where: { id: id }
        })
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        
        res.status(200).json(recurso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Recurso' });
    }
};