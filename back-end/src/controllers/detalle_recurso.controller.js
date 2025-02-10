import DetalleRecurso from "../models/DetalleRecurso.js";
import Espacio from "../models/Espacio.js";
import Recurso from "../models/Recurso.js";

export const getDetallesRecursos = async (req, res) => {
  try {
    const detalles_recursos = await DetalleRecurso.findAll({
      include: [
        { model: Espacio, as: "espacio" },
        { model: Recurso, as: "recurso" },
      ],
    });
    res.status(200).json(detalles_recursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ha ocurrido un error al obtener los Detalles Recursos",
    });
  }
};

export const getDetalleRecursoById = async (req, res) => {
  try {
    const { id } = req.params;

    const detalle_recurso = await DetalleRecurso.findByPk(id, {
      include: [
        { model: Espacio, as: "espacio" },
        { model: Recurso, as: "recurso" },
      ],
    });

    if (!detalle_recurso) {
      return res.status(404).json({ message: "Detalle Recurso no encontrado" });
    }

    res.status(200).json(detalle_recurso);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener el Detalle Recurso" });
  }
};

export const createDetalleRecurso = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // Ver los datos recibidos

    // Asegurarse de que siempre se reciba un array
    const detallesRecursos = Array.isArray(req.body) ? req.body : [req.body];

    // Verificar si el cuerpo de la solicitud contiene al menos un elemento
    if (detallesRecursos.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe enviar al menos un recurso." });
    }

    const recursosActualizados = []; // Array para almacenar los recursos creados

    for (const detalle of detallesRecursos) {
      const { recursoId, cantidad, espacioId } = detalle;

      // Convertir la cantidad a número
      const cantidadNumerica = parseInt(cantidad, 10);

      // Verificar que la cantidad sea válida
      if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
        return res
          .status(400)
          .json({ message: "La cantidad debe ser un número mayor a 0" });
      }

      // Buscar el recurso
      const recurso = await Recurso.findByPk(recursoId);
      if (!recurso) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }

      // Verificar si hay suficiente stock disponible
      if (recurso.disponible < cantidadNumerica) {
        return res
          .status(400)
          .json({ message: `No hay suficiente stock de ${recurso.nombre}.` });
      }

      // Crear el detalle de recurso
      const nuevoDetalleRecurso = await DetalleRecurso.create({
        recursoId,
        cantidad: cantidadNumerica,
        espacioId,
      });

      // Actualizar el recurso restando la cantidad
      const nuevoDisponible = recurso.disponible - cantidadNumerica;
      await recurso.update({ disponible: nuevoDisponible });

      recursosActualizados.push(nuevoDetalleRecurso); // Guardamos el detalle creado
    }

    // Responder con todos los detalles creados
    return res.status(201).json(recursosActualizados);
  } catch (error) {
    console.error("Error al crear el Detalle Recurso:", error);
    res.status(500).json({ message: "Error al crear el DetalleRecurso" });
  }
};

export const updateDetallesRecursos = async (req, res) => {
  try {
    const { idDetalle, idRecurso, cantidad } = req.body; // Recibe los IDs y la nueva cantidad

    // 📌 Buscar el detalle del recurso
    const detalle = await DetalleRecurso.findByPk(idDetalle);
    if (!detalle) {
      return res
        .status(404)
        .json({ message: `Detalle con ID ${idDetalle} no encontrado` });
    }

    // 📌 Buscar el recurso asociado
    const recurso = await Recurso.findByPk(idRecurso);
    if (!recurso) {
      return res
        .status(404)
        .json({ message: `Recurso con ID ${idRecurso} no encontrado` });
    }

    console.log(
      `🔹 Antes de actualizar -> Detalle ID: ${idDetalle}, Cantidad Detalle: ${detalle.cantidad}`
    );
    console.log(
      `🔹 Recurso ID: ${idRecurso}, Cantidad: ${recurso.cantidad}, Disponible: ${recurso.disponible}`
    );

    // 📌 Calcular la diferencia entre la nueva cantidad y la anterior
    const diferencia = cantidad - detalle.cantidad; // Positivo si aumenta, negativo si disminuye

    // 📌 Ajustar disponibilidad con el mismo incremento o decremento
    let nuevaDisponibilidad = recurso.disponible - diferencia;

    // 📌 Evitar valores negativos en `disponible`
    if (nuevaDisponibilidad < 0) {
      return res.status(400).json({
        message: `No hay suficiente disponibilidad para reducir el recurso con ID ${idRecurso}.`,
      });
    }

    // 📌 Actualizar `cantidad` en `detalleRecurso`
    await DetalleRecurso.update({ cantidad }, { where: { id: idDetalle } });

    // 📌 Actualizar `disponible` en `recurso`
    await Recurso.update(
      { disponible: nuevaDisponibilidad },
      { where: { id: idRecurso } }
    );

    console.log(
      `✅ Después de actualizar -> Detalle ID: ${idDetalle}, Cantidad Detalle: ${cantidad}`
    );
    console.log(
      `✅ Recurso ID: ${idRecurso}, Cantidad: ${recurso.cantidad}, Disponible: ${nuevaDisponibilidad}`
    );

    res.status(200).json({
      message: `Detalle y recurso actualizados correctamente.`,
      detalle: { id: idDetalle, cantidad },
      recurso: {
        id: idRecurso,
        cantidad: recurso.cantidad,
        disponible: nuevaDisponibilidad,
      },
    });
  } catch (error) {
    console.error("❌ Error al actualizar el detalle y recurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteDetalleRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle_recurso = await DetalleRecurso.destroy({
      where: { id: id },
    });
    if (!detalle_recurso) {
      return res.status(404).json({ message: "Detalle Recurso no encontrado" });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(detalle_recurso);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar el Detalle Recurso" });
  }
};
