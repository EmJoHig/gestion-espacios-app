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

        if (nuevoRecurso === null) {
            return res.status(400).json({ message: 'No se pudo crear el Recurso' });
        } else {
            return res.status(200).json({ message: 'El Recurso se guardo con exito' });
        }

    } catch (error) {
        console.error('Error al crear el recurso:', error);
        res.status(500).json({ message: 'Error al crear el recurso' });
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

        const _editRecurso = await Recurso.update(updates, {
            where: { id: id }
        });

        if (_editRecurso === null) {
            return res.status(400).json({ message: 'No se pudo editar el Recurso' });
        } else {
            return res.status(200).json({ message: 'El Recurso se edito con exito' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Recurso' });
    }
};

export const deleteRecurso = async (req, res) => {
    try {
        const { id } = req.params;


        console.log("Eliminar recurso con id:", id);


        const recursoDelete = await Recurso.destroy({
            where: { id: id }
        })
        
        if (recursoDelete === null) {
            return res.status(400).json({ message: 'No se pudo eliminar el Recurso' });
        } else {
            return res.status(200).json({ message: 'El Recurso se elimino con exito' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Recurso' });
    }
};