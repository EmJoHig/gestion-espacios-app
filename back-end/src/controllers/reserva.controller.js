import Reserva from '../models/Reserva.js';


export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        // Enviar una respuesta al cliente
        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener las reservas' });
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
        const { espacioId, ministerioId, fechaInicio, fechaFin } = req.body;

        // Crear el nuevo espacio
        const nuevaReserva = await Reserva.create({
            espacioId, ministerioId, fechaInicio, fechaFin
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
        const { espacioId, ministerioId, fechaInicio, fechaFin } = req.body;

        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = reserva.id;
        if (espacioId) updates.espacioId = espacioId;
        if (ministerioId) updates.ministerioId = ministerioId;
        if (fechaInicio) updates.fechaInicio = fechaInicio;
        if (fechaFin) updates.fechaFin = fechaFin;

        // await Esácop.update(updates)
        await Reserva.update(updates, {
            where: { id: id }
        });

        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
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