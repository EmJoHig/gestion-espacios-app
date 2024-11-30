import Espacio from '../models/Espacio.js';
import bcrypt from "bcryptjs";


export const getEspacios = async (req, res) => {
    try {
        const espacios = await Espacio.findAll();
        // Enviar una respuesta al cliente
        res.status(200).json(espacios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los espacios' });
    }
};

export const getEspacioById = async (req, res) => {
    try {
        const { id } = req.params;

        const espacio = await Espacio.findByPk(id);
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }

        res.status(200).json(espacio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Espacio' });
    }
};


export const createEspacio = async (req, res) => {
    try {
        console.log(req.body);
        const { nombre } = req.body;

        // Crear el nuevo espacio
        const nuevoEspacio = await Espacio.create({
            nombre
        });

        // Enviar una respuesta al cliente con el ministerio creado
        res.status(201).json(nuevoEspacio);
    } catch (error) {
        console.error('Error al crear el espacio:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Espacio' });
    }
};


export const updateEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const espacio = await Espacio.findByPk(id);
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = espacio.id;
        if (nombre) updates.nombre = nombre;

        // await Esácop.update(updates)
        await Espacio.update(updates, {
            where: { id: id }
        });

        res.status(200).json(espacio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Espacio' });
    }
};

export const deleteEspacio = async (req, res) => {
    try {
        const { id } = req.params;
        const espacio = await Espacio.destroy({
            where: { id: id }
        })
        if (!espacio) {
            return res.status(404).json({ message: 'Espacio no encontrado' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(espacio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Espacio' });
    }
};
