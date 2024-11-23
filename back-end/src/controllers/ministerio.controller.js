import Ministerio from '../models/Ministerio.js';
import Usuario from '../models/Usuario.js';
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
        console.log("req.body");
        console.log(req.body);

        const { codigo, descripcion } = req.body;

        // Crear el nuevo ministerio
        const nuevoMinisterio = await Ministerio.create({
            codigo,
            descripcion
        });

        // Enviar una respuesta al cliente con el ministerio creado
        res.status(201).json(nuevoMinisterio);
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

        // await Ministerio.update(updates)
        await Ministerio.update(updates, {
            where: { id: id }
        });

        res.status(200).json(ministerio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Ministerio' });
    }
};

export const deleteMinisterio = async (req, res) => {
    try {
        const { id } = req.params;
        const ministerio = await Ministerio.destroy({
            where: { id: id }
        })
        if (!ministerio) {
            return res.status(404).json({ message: 'Ministerio no encontrado' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(ministerio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Ministerio' });
    }
};


//ASOCIAR ROL A USUARIO
export const asociarResponsableAMinist = async (req, res) => {
    try {
        const { idUsuario, idMinisterio } = req.body;

        const _usuario = await Usuario.findOne({ where: { id: idUsuario }});

        if(_usuario){
            //const idMinisterioPaseado = Number.isInteger(Number(idMinisterio)) ? parseInt(idMinisterio, 10) : null;
            const resp = await Usuario.update(
                { ministerioId: idMinisterio }, // Campos a actualizar
                { where: { id: idUsuario } } // Condición de búsqueda
            );

            if (resp[0] > 0) {
                res.status(200).json({ message: 'Usuario asociado al Ministerio' });
            } else {
                res.status(404).json({ message: 'No se pudo asociar el usuario al ministerio. Usuario no encontrado o sin cambios' });
            }

        }else{
            res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol al Usuario' });
        }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};