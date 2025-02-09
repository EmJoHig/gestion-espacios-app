import Recurso from "../models/Recurso.js";
import bcrypt from "bcryptjs";
import DetalleRecurso from "../models/DetalleRecurso.js";

export const getRecursos = async (req, res) => {
  try {
    const recursos = await Recurso.findAll();

    res.status(200).json(recursos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los usuarios" });
  }
};

export const getRecursoById = async (req, res) => {
  try {
    const { id } = req.params;

    const recurso = await Recurso.findByPk(id);
    if (!recurso) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    res.status(200).json(recurso);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener el Recurso" });
  }
};

export const createRecurso = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad } = req.body;

    // Verificar que los datos sean válidos
    if (!nombre || !descripcion || cantidad <= 0) {
      return res
        .status(400)
        .json({ message: "Datos incompletos o inválidos." });
    }

    // Crear el nuevo recurso con la cantidad y disponible igual
    const nuevoRecurso = await Recurso.create({
      nombre,
      descripcion,
      cantidad, // Cantidad de recursos (es equivalente a "total")
      disponible: cantidad, // Stock disponible igual a la cantidad inicial
    });

    if (nuevoRecurso === null) {
      return res.status(400).json({ message: "No se pudo crear el Recurso" });
    } else {
      return res
        .status(200)
        .json({ message: "El Recurso se guardo con exito" });
    }
  } catch (error) {
    console.error("Error al crear el recurso:", error);
    res.status(500).json({ message: "Error al crear el recurso" });
  }
};

export const updateRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad } = req.body;

    // Buscar el recurso por su ID
    const recurso = await Recurso.findByPk(id);
    if (!recurso) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    // Obtener la cantidad de recursos ya asignados a espacios
    const cantidadAsignada = await DetalleRecurso.sum("cantidad", {
      where: { id_recurso: id },
    });

    // Si la cantidad asignada no existe, se establece en 0
    const cantidadDisponible = cantidad - (cantidadAsignada || 0);

    // Preparar los campos a actualizar
    const updates = {
      nombre: nombre || recurso.nombre,
      descripcion: descripcion || recurso.descripcion,
      cantidad: cantidad || recurso.cantidad, // Solo actualizamos cantidad si es necesario
      disponible: cantidadDisponible, // Recalculamos disponible con la diferencia
    };

    // Actualizar el recurso en la base de datos
    const _editRecurso = await Recurso.update(updates, {
      where: { id: id },
    });

    // Verificar si la actualización fue exitosa
    if (_editRecurso[0] === 0) {
      return res.status(400).json({ message: "No se pudo editar el Recurso" });
    } else {
      return res.status(200).json({ message: "El Recurso se editó con éxito" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar el Recurso" });
  }
};

export const deleteRecurso = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Eliminar recurso con id:", id);

    // Primero, eliminamos los detalles asociados al recurso
    await DetalleRecurso.destroy({
      where: { recursoId: id }, // Esto eliminará los registros en DetalleRecurso relacionados con el recurso
    });

    // Luego, eliminamos el recurso
    const recursoDelete = await Recurso.destroy({
      where: { id: id },
    });

    if (recursoDelete === 0) {
      // Verificamos si no se eliminó ningún recurso
      return res
        .status(400)
        .json({ message: "No se pudo eliminar el Recurso" });
    }

    return res
      .status(200)
      .json({
        message:
          "El Recurso y sus detalles asociados fueron eliminados con éxito",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar el Recurso" });
  }
};
