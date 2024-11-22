import Espacio from "../models/Espacio.js";

export const getEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.findAll();
    // Enviar una respuesta al cliente
    res.status(200).json(espacios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los espacios." });
  }
};

export const getEspacioById = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await Espacio.findByPk(id);
    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrado." });
    }

    res.status(200).json(espacio);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener la Espacio." });
  }
};

export const createEspacio = async (req, res) => {
  try {
    console.log("req.body");
    console.log(req.body);

    const { nombre, descripcion, capacidad, estado_espacioId } = req.body;

    // Crear el espacio nuevo.
    const nuevoEspacio = await Espacio.create({
      nombre,
      descripcion,
      capacidad,
      estado_espacioId,
    });

    // Enviar una respuesta al cliente con la espacio nueva.
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    console.error("Error al crear el espacio:", error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al crear el Espacio" });
  }
};

export const updateEspacio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, capacidad, estado_espacioId } = req.body;

    const espacio = await Espacio.findByPk(id);
    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrada" });
    }

    const updates = {};
    //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
    if (id) updates.id = espacio.id;
    if (nombre) updates.nombre = nombre;
    if (descripcion) updates.descripcion = descripcion;
    if (capacidad) updates.capacidad = capacidad;
    if (estado_espacioId) updates.estado_espacioId = estado_espacioId;

    // await Espacio.update(updates)
    await Espacio.update(updates, {
      where: { id: id },
    });

    res.status(200).json(espacio);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar el espacio" });
  }
};

export const deleteEspacio = async (req, res) => {
  try {
    const { id } = req.params;
    const espacio = await Espacio.destroy({
      where: { id: id },
    });
    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(espacio);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar el espacio" });
  }
};
