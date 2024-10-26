import Rol from '../models/Rol.js';
import bcrypt from "bcryptjs";


export const getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        // Enviar una respuesta al cliente
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los usuarios' });
    }
};

export const getRolById = async (req, res) => {
    try {
        const { id } = req.params;

        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Rol' });
    }
};


export const createRol = async (req, res) => {
    try {
        console.log("req.body");
        console.log(req.body);

        const { name, description } = req.body;

        // Crear el nuevo rol
        const nuevoRol = await Rol.create({
            name,
            description
        });

        // Enviar una respuesta al cliente con el rol creado
        res.status(201).json(nuevoRol);
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};


export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = rol.id;
        if (name) updates.name = name;
        if (description) updates.description = description;

        // await Rol.update(updates)
        await Rol.update(updates, {
            where: { id: id }
        });

        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol' });
    }
};

export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.destroy({
            where: { id: id }
        })
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Rol' });
    }
};