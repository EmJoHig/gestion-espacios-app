import Solicitud from '../models/Solicitud.js';
import Reserva from '../models/Reserva.js';
import Espacio from '../models/Espacio.js';
import Ministerio from '../models/Ministerio.js';
import Actividad from '../models/Actividad.js';
import EstadoSolicitud from '../models/EstadoSolicitud.js';
import { Sequelize, Op } from "sequelize";


export const getSolicitudes = async (req, res) => {
    try {

        const solicitudes = await Solicitud.findAll(
            {
                include: [
                    { model: Ministerio, as: 'ministerio' },
                    { model: Espacio, as: 'espacio' },
                    { model: Actividad, as: 'actividad' },
                    { model: EstadoSolicitud, as: 'estadoSolicitud' },
                ]
            });

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las solicitudes de s' });
    }
};


// BUSQUEDA SOLICITUDES POR FILTROS
export const getSolicitudesFilter = async (req, res) => {
    try {

        const { espacioId, fechaInicio } = req.query;

        const whereClause = {};

        if (espacioId) whereClause.espacioId = espacioId;
        // if (fechaInicio) whereClause.fechaInicio = fechaInicio;
        if (fechaInicio) {
            whereClause[Op.and] = [
                Sequelize.where(
                    Sequelize.fn('DATE', Sequelize.col('fechaInicio')),
                    '=',
                    fechaInicio
                ),
            ];
        }

        // Realizar la búsqueda con los filtros
        const solicitudes = await Solicitud.findAll({
            where: whereClause, // Filtros dinámicos
            include: [
                { model: Ministerio, as: 'ministerio' },
                { model: Espacio, as: 'espacio' },
                { model: Actividad, as: 'actividad' },
                { model: EstadoSolicitud, as: 'estadoSolicitud' },
            ],
            order: [['fechaInicio', 'DESC']],
        });

        res.status(200).json(solicitudes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las solicitudes de s' });
    }
};


export const getSolicitudById = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitud = await Solicitud.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        res.status(200).json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la Solicitud' });
    }
};



export const createSolicitud = async (req, res) => {
    try {

        const { espacioId, ministerioId, actividadId, fechaInicio, fechaFin } = req.body;

        const espacio = await Espacio.findByPk(espacioId);

        const ministerio = await Ministerio.findByPk(ministerioId);

        const actividad = await Actividad.findByPk(actividadId);


        console.log('req.body solicitud: ', req.body);


        if (espacio === null || ministerio === null || actividad === null) {
            return res.status(404).json({ message: 'Espacio, Ministerio o Actividad no encontrado' });

        } else
            if (espacio && ministerio && actividad) {

                /// busco estado en proceso
                const estadoEP = await EstadoSolicitud.findOne({ where: { codigo: 'EP' } });

                if (!estadoEP) {
                    return res.status(404).json({ message: 'Estado de Solicitud no encontrado' });
                }

                const nuevaSolicitud = await Solicitud.create({
                    espacioId: espacioId,
                    ministerioId: ministerioId,
                    actividadId: actividadId,
                    estadoSolicitudId: estadoEP.id,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                });

                if (nuevaSolicitud) {
                    res.status(200).json(nuevaSolicitud);
                } else {
                    return res.status(500).json({ message: 'Error al crear la solicitud' });
                }
            }
            else {
                return res.status(500).json({ message: 'Error al crear la solicitud' });
            }
    } catch (error) {
        console.error('Error al crear la solicitud :', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear la solicitud ' });
    }
};


export const updateSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const { espacioId, ministerioId, fechaInicio, fechaFin } = req.body;

        const solicitud = await Solicitud.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud de  no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = solicitud.id;
        if (espacioId) updates.espacioId = espacioId;
        if (ministerioId) updates.ministerioId = ministerioId;
        if (fechaInicio) updates.fechaInicio = fechaInicio;
        if (fechaFin) updates.fechaFin = fechaFin;

        // await Esácop.update(updates)
        await Solicitud.update(updates, {
            where: { id: id }
        });

        res.status(200).json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar la Solicitud de ' });
    }
};

export const deleteSolicitud = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitud = await Solicitud.destroy({
            where: { id: id }
        })
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud de  no encontrada' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar la Reserva' });
    }
};


// CAMBIAR ESTADO SOLICITUD DE RESERVA
// APROBADA - EN PROCESO - RECHAZADA
export const cambiarEstadoSolicitud = async (req, res) => {
    try {

        const { idSolicitud, codigoEstado } = req.body;

        const _solicitud = await Solicitud.findByPk(idSolicitud);

        console.log("idSolicitud", idSolicitud);

        console.log("que mierda tenes", _solicitud);


        if (_solicitud === null) {

            return res.status(500).json({ message: 'Solicitud no encontrada' });

        } else {

            const _estadoSolicitud = await EstadoSolicitud.findOne({ where: { codigo: codigoEstado } });

            if (_estadoSolicitud) {

                const resp = await Solicitud.update(
                    { estadoSolicitudId: _estadoSolicitud.id }, // Campos a actualizar
                    { where: { id: idSolicitud } }
                );

                if (resp && resp[0] >= 0) {
                    res.status(200).json({ message: 'La solicitud ha sido aprobada' });
                } else {
                    res.status(500).json({ message: 'Error al cambiar estado de solicitud.' });
                }

            } else {
                res.status(500).json({ message: 'Error al cambiar estado de solicitud. Estado no encontrado' });
            }
        }
    } catch (error) {
        console.error('Error al cambiar estado de solicitud :', error);
        res.status(500).json({ message: 'Ha ocurrido un error al cambiar estado de solicitud ' });
    }
};