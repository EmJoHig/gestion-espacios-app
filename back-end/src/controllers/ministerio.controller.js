import Ministerio from '../models/Ministerio.js';
import Usuario from '../models/Usuario.js';
import Actividad from '../models/Actividad.js';

import bcrypt from "bcryptjs";


export const getMinisterios = async (req, res) => {
    try {
        const ministerios = await Ministerio.findAll();
        // Enviar una respuesta al cliente
        res.status(200).json(ministerios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los usuarios' });
    }
};

export const getMinisterioById = async (req, res) => {
    try {
        const { id } = req.params;

        const ministerio = await Ministerio.findByPk(id);
        if (!ministerio) {
            return res.status(404).json({ message: 'Ministerio no encontrado' });
        }

        res.status(200).json(ministerio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Ministerio' });
    }
};


export const createMinisterio = async (req, res) => {
    try {

        const { codigo, descripcion } = req.body;

        const nuevoMinisterio = await Ministerio.create({
            codigo,
            descripcion
        });

        if (nuevoMinisterio === null) {
            return res.status(400).json({ message: 'No se pudo crear el ministerio' });
        } else {
            return res.status(200).json({ message: 'El ministerio se guardo con exito' });
        }

    } catch (error) {
        console.error('Error al crear el ministerio:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Ministerio' });
    }
};


export const updateMinisterio = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, descripcion } = req.body;

        const ministerio = await Ministerio.findByPk(id);
        if (!ministerio) {
            return res.status(404).json({ message: 'Ministerio no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = ministerio.id;
        if (codigo) updates.codigo = codigo;
        if (descripcion) updates.descripcion = descripcion;

        const _editMinisterio = await Ministerio.update(updates, {
            where: { id: id }
        });

        if (_editMinisterio === null) {
            return res.status(400).json({ message: 'No se pudo editar el ministerio' });
        } else {
            return res.status(200).json({ message: 'El ministerio se edito con exito' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al editar el Ministerio' });
    }
};

export const deleteMinisterio = async (req, res) => {
    try {
        const { id } = req.params;
        const ministerioDelete = await Ministerio.destroy({
            where: { id: id }
        });

        if (ministerioDelete === null) {
            return res.status(400).json({ message: 'No se pudo eliminar el Ministerio' });
        } else {
            return res.status(200).json({ message: 'El Ministerio se elimino con exito' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Ministerio' });
    }
};


//ASOCIAR ROL A USUARIO
export const asociarResponsableAMinist = async (req, res) => {
    try {
        const { idUsuario, idMinisterio } = req.body;

        const _usuario = await Usuario.findOne({ where: { id: idUsuario } });

        if (_usuario) {
            //const idMinisterioPaseado = Number.isInteger(Number(idMinisterio)) ? parseInt(idMinisterio, 10) : null;

            const resp = await Usuario.update(
                { ministerioId: idMinisterio }, // Campos a actualizar
                { where: { id: idUsuario } } // Condición de búsqueda
            );

            if (resp && resp[0] >= 0) {
                res.status(200).json({ message: 'Usuario asociado al Ministerio' });
            } else {
                res.status(404).json({ message: 'No se pudo asociar el usuario al ministerio. Usuario no encontrado o sin cambios' });
            }

        } else {
            res.status(500).json({ message: 'Ha ocurrido un error al asociar Responsable a Ministerio' });
        }
    } catch (error) {
        console.error('Error al asociar Responsable a Ministerio: ', error);
        res.status(500).json({ message: 'Ha ocurrido un error al asociar Responsable a Ministerio' });
    }
};


export const getActividadesPorMinisterio = async (req, res) => {
    try {
        
        const { idMinisterio } = req.query;
        
        const actividades = await Actividad.findAll({ where: { ministerioId: idMinisterio } });

        if (actividades === null) {
            return res.status(400).json({ message: 'No se pudo crear el ministerio' });
        } else {
            return res.status(200).json(actividades);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las actividades del ministerio' });
    }
};
