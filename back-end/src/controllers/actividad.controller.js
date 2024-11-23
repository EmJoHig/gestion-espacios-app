import Actividad from "../models/Actividad.js";

export const getActividades = async (req, res) => {
  try {
    const actividades = await Actividad.findAll();
    // Enviar una respuesta al cliente
    res.status(200).json(actividades);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener las actividades." });
  }
};

export const getActividadById = async (req, res) => {
  try {
    const { id } = req.params;

    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada." });
    }

    res.status(200).json(actividad);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener la Actividad." });
  }
};

export const createActividad = async (req, res) => {
  try {
    console.log("req.body");
    console.log(req.body);

    const { nombre, descripcion, ministerioId } = req.body;

    // Crear la actividad nueva.
    const nuevaActividad = await Actividad.create({
      nombre,
      descripcion,
      ministerioId,
    });

    // Enviar una respuesta al cliente con la actividad nueva.
    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al crear la Actividad" });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, ministerioId } = req.body;

    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }

    const updates = {};
    //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
    if (id) updates.id = actividad.id;
    if (nombre) updates.nombre = nombre;
    if (descripcion) updates.descripcion = descripcion;
    if (ministerioId) updates.ministerioId = ministerioId;

    // await Actividad.update(updates)
    await Actividad.update(updates, {
      where: { id: id },
    });

    res.status(200).json(actividad);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar la actividad" });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.destroy({
      where: { id: id },
    });
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(actividad);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar la actividad" });
  }
};
