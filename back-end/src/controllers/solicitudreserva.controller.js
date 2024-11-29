import SolicitudReserva from '../models/SolicitudReserva.js';
import Reserva from '../models/SolicitudReserva.js';


export const getSolicitudesReservas = async (req, res) => {
    try {
        const solicitudesReservas = await SolicitudReserva.findAll();
        // Enviar una respuesta al cliente
        res.status(200).json(solicitudesReservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las solicitudes de reservas' });
    }
};

export const getSolicitudReservaById = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitudReserva = await SolicitudReserva.findByPk(id);
        if (!solicitudReserva) {
            return res.status(404).json({ message: 'Solicitud de Reserva no encontrada' });
        }

        res.status(200).json(solicitudReserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener la Solicitud de Reserva' });
    }
};


export const createSolicitudReserva = async (req, res) => {
    try {
        console.log(req.body);
        const { espacioId, ministerioId, fechaInicio, fechaFin } = req.body;

        // Crear el nuevo espacio
        const nuevaSolicitudReserva = await Reserva.create({
            espacioId, ministerioId, fechaInicio, fechaFin
        });

        // Enviar una respuesta al cliente con el ministerio creado
        res.status(201).json(nuevaSolicitudReserva);
    } catch (error) {
        console.error('Error al crear la solicitud de reserva:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear la Solicitud de Reserva' });
    }
};


export const updateSolicitudReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { espacioId, ministerioId, fechaInicio, fechaFin } = req.body;

        const solicitudReserva = await Reserva.findByPk(id);
        if (!solicitudReserva) {
            return res.status(404).json({ message: 'Solicitud de Reserva no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = reserva.id;
        if (espacioId) updates.espacioId = espacioId;
        if (ministerioId) updates.ministerioId = ministerioId;
        if (fechaInicio) updates.fechaInicio = fechaInicio;
        if (fechaFin) updates.fechaFin = fechaFin;

        // await Esácop.update(updates)
        await SolicitudReserva.update(updates, {
            where: { id: id }
        });

        res.status(200).json(solicitudReserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar la Solicitud de Reserva' });
    }
};

export const deleteSolicitudReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitudReserva = await SolicitudReserva.destroy({
            where: { id: id }
        })
        if (!solicitudReserva) {
            return res.status(404).json({ message: 'Solicitud de Reserva no encontrada' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar la Reserva' });
    }
};