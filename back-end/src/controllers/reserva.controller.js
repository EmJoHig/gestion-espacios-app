import Reserva from '../models/Reserva.js';
import Espacio from '../models/Espacio.js';
import Ministerio from '../models/Ministerio.js';
import Actividad from "../models/Actividad.js";
import TipoEspacio from "../models/TipoEspacio.js";
import Usuario from '../models/Usuario.js';
import nodemailer from 'nodemailer';
import { Op, Sequelize } from 'sequelize';
Reserva.associate();

const transporter = nodemailer.createTransport({
    service: "gmail", // O usa SMTP de tu proveedor
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  


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
        // console.log("req.body reserva: ");
        // console.log(req.body);
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
            espacioId, ministerioId, actividadId, fechaInicio, fechaFin
        });

        const usuarios = await Usuario.findAll({
            where: { ministerioId },
            attributes: ['email']
        });

        // Enviar correo a cada usuario del ministerio
        if (usuarios.length > 0) {
            const destinatarios = usuarios.map(user => user.email).join(',');
            
            const mailOptions = {
                from: 'incidenciasydespliegues@gmail.com',
                to: destinatarios,
                subject: 'Confirmación de Reserva',
                text: `Se ha creado una nueva reserva en el sistema:\n\nEspacio ID: ${espacioId}\nFecha Inicio: ${fechaInicio}\nFecha Fin: ${fechaFin}\n\nSaludos, Sistema de Reservas.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar correo:', error);
                } else {
                    console.log('Correo enviado:', info.response);
                }
            });
        }



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


// BUSQUEDA RESERVAS POR FILTROS
export const getReservasFilter = async (req, res) => {
    try {

        const { espacioId, fechaInicio } = req.query;
        const whereClause = {};

        if (espacioId) whereClause.espacioId = espacioId;
        if (fechaInicio) {
            whereClause[Op.and] = [
                Sequelize.where(
                    Sequelize.fn('DATE', Sequelize.col('fechaInicio')),
                    '=',
                    fechaInicio
                ),
            ];
        }

        const reservas = await Reserva.findAll({
            where: whereClause,
            include: [
                {
                    model: Espacio,
                    attributes: ['nombre'],
                },
                {
                    model: Ministerio,
                    attributes: ['descripcion'],
                },
                {
                    model: Actividad,
                    attributes: ['nombre'],
                },
            ],
            attributes: { exclude: ['espacioId', 'ministerioId', 'actividadId'] },
            order: [['fechaInicio', 'DESC']],
        });

        res.status(200).json(reservas);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las reservas' });
    }
};


// DAR BAJA RESERVA
export const bajaReserva = async (req, res) => {
    try {

        const { idReserva } = req.body;
        const _reserva = await Reserva.findByPk(idReserva);

        if (_reserva === null) {

            return res.status(500).json({ message: 'Reserva no encontrada' });

        } else {

            const resp = await Reserva.update(
                { fechaBaja: new Date() },
                { where: { id: idReserva } }
            );

            if (resp && resp[0] >= 0) {
                res.status(200).json({ message: 'La Reserva ha sido dada de baja' });
            } else {
                res.status(500).json({ message: 'Error al dar de baja la Reserva.' });
            }
        }
    } catch (error) {
        console.error('Error al dar de baja la Reserva :', error);
        res.status(500).json({ message: 'Ha ocurrido un error al dar de baja la Reserva ' });
    }
};



//  validar si hay mas aulas disopnibles


export const validarAulasDisponibles = async (req, res) => {
    try {

        const { fechaInicio, fechaFin } = req.body;


        // const tipoEspacio = await TipoEspacio.findOne({ where: { nombre: "AULA" } });


        // Verificar si ya existe una reserva para el mismo espacio en el rango de fechas
        const reservasConflicto = await Reserva.findAll({
            include: [
                {
                    model: Espacio,
                    include: [
                        {
                            model: TipoEspacio,
                            as: 'tipoEspacio',
                            where: { nombre: "AULA" }, // Filtrar por tipo de espacio "COCINA"
                        },
                    ],
                },
            ],
            where: {
                //espacioId: espacioId, // Verificar el espacio específico
                [Op.or]: [
                    {
                        fechaInicio: {
                            [Op.lt]: fechaFin, // Fecha de inicio antes de la nueva fecha de fin
                        },
                        fechaFin: {
                            [Op.gt]: fechaInicio, // Fecha de fin después de la nueva fecha de inicio
                        },
                    },
                ],
            },
        });
        console.log("reservasConflicto: ",  reservasConflicto.length);
        if (reservasConflicto && reservasConflicto.length > 1) {
            return res.status(200).json({ result: false });
        }else{
            return res.status(200).json({ result: true });
        }

    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear la Reserva' });
    }
};