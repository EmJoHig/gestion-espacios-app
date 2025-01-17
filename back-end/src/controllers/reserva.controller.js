import Reserva from '../models/Reserva.js';
import Espacio from '../models/Espacio.js';
import Ministerio from '../models/Ministerio.js';
import Actividad from "../models/Actividad.js";
import { Op } from 'sequelize';
Reserva.associate();


export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
          include: [
            {
              model: Espacio, // Asegúrate de tener el modelo de Espacio
              attributes: ['nombre'], // Solo traer el nombre de espacio
            },
            {
              model: Ministerio, // Asegúrate de tener el modelo de Ministerio
              attributes: ['codigo'], // Solo traer el nombre del ministerio
            },
            {
              model: Actividad, // Asegúrate de tener el modelo de Actividad
              attributes: ['nombre'], // Solo traer el nombre de la actividad
            },
          ],
          attributes: { exclude: ['espacioId', 'ministerioId', 'actividadId'] },
        });
    
        const reservasFormateadas = reservas.map((reserva) => {
            return {
                id: reserva.id,
                fechaInicio: reserva.fechaInicio,
                fechaFin: reserva.fechaFin,
                Espacio: reserva.Espacio,
                Ministerio: reserva.Ministerio,
                Actividad: reserva.Actividad,
            };
          });
      
          res.json(reservasFormateadas); // Enviar las reservas sin los IDs
        } catch (error) {
          console.error('Error al obtener las reservas:', error);
          res.status(500).send('Error al obtener las reservas');
        }
};

export const getReservaById = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la Reserva' });
    }
};


export const createReserva = async (req, res) => {
    try {
        console.log(req.body);
        const { espacioId, ministerioId, actividadId, fechaInicio, fechaFin } = req.body;

       // Verificar si ya existe una reserva para el mismo espacio en el rango de fechas
        const reservasConflicto = await Reserva.findOne({
            where: {
                espacioId: { [Op.ne]: espacioId }, // Excluir la reserva que se está actualizando
                espacioId: espacioId || reserva.espacioId, // Usar el nuevo espacioId o el actual
                [Op.or]: [
                    {
                        fechaInicio: {
                            [Op.lt]: fechaFin || reserva.fechaFin, // Fecha de inicio antes de la nueva fecha de fin
                        },
                        fechaFin: {
                            [Op.gt]: fechaInicio || reserva.fechaInicio, // Fecha de fin después de la nueva fecha de inicio
                        },
                    },
                ],
            },
        });


        if (reservasConflicto) {
            return res.status(400).json({ message: 'Ya existe una reserva para este espacio en el rango de fechas indicado.' });
        }
       
       
        // Crear el nuevo espacio
        const nuevaReserva = await Reserva.create({
            espacioId, ministerioId,actividadId, fechaInicio, fechaFin
        });

        // Enviar una respuesta al cliente con el ministerio creado
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear la Reserva' });
    }
};


export const updateReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { espacioId, ministerioId, actividadId, fechaInicio, fechaFin } = req.body;

        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Verificar si ya existe una reserva para el mismo espacio en el rango de fechas
        const reservasConflicto = await Reserva.findOne({
            where: {
                espacioId: { [Op.ne]: espacioId }, // Excluir la reserva que se está actualizando
                espacioId: espacioId || reserva.espacioId, // Usar el nuevo espacioId o el actual
                [Op.or]: [
                    {
                        fechaInicio: {
                            [Op.lt]: fechaFin || reserva.fechaFin, // Fecha de inicio antes de la nueva fecha de fin
                        },
                        fechaFin: {
                            [Op.gt]: fechaInicio || reserva.fechaInicio, // Fecha de fin después de la nueva fecha de inicio
                        },
                    },
                ],
            },
        });

        if (reservasConflicto) {
            return res.status(400).json({ message: 'Ya existe una reserva para este espacio en el rango de fechas indicado.' });
        }

        // Actualizar la reserva
        const updates = {
            espacioId: espacioId || reserva.espacioId,
            ministerioId: ministerioId || reserva.ministerioId,
            actividadId: actividadId || reserva.actividadId,
            fechaInicio: fechaInicio || reserva.fechaInicio,
            fechaFin: fechaFin || reserva.fechaFin,
        };

        await Reserva.update(updates, {
            where: { id: id },
        });

        const reservaActualizada = await Reserva.findByPk(id); // Obtener la reserva actualizada
        res.status(200).json(reservaActualizada);
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar la Reserva' });
    }
};

export const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.destroy({
            where: { id: id }
        })
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar la Reserva' });
    }
};