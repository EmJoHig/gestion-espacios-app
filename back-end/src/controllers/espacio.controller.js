import Espacio from "../models/Espacio.js";
import bcrypt from "bcryptjs";
import EstadoEspacio from "../models/EstadoEspacio.js";
import TipoEspacio from "../models/TipoEspacio.js";
import DetalleRecurso from "../models/DetalleRecurso.js";
import Recurso from "../models/Recurso.js";

export const getEspacios = async (req, res) => {
  try {
    // Obtener los espacios junto con los recursos asociados
    const espacios = await Espacio.findAll({
      include: [
        {
          model: EstadoEspacio,
          as: "estado",
        },
        {
          model: TipoEspacio,
          as: "tipoEspacio",
        },
        {
          model: DetalleRecurso,
          as: "detalleRecursosEspacio",
          include: [
            {
              model: Recurso,
              as: "recurso",
            },
          ],
        },
      ],
    });

    // Agrupar los recursos por nombre y descripción, sumando las cantidades
    const espaciosAgrupados = espacios.map((espacio) => {
      const recursosAgrupados = espacio.detalleRecursosEspacio.reduce(
        (acc, detalle) => {
          const { recurso, cantidad } = detalle;

          // Verificar si ya existe este recurso en el acumulador
          const existingRecurso = acc.find(
            (item) =>
              item.nombre === recurso.nombre &&
              item.descripcion === recurso.descripcion
          );

          if (existingRecurso) {
            // Si ya existe, sumamos la cantidad
            existingRecurso.cantidad += cantidad;
          } else {
            // Si no existe, lo agregamos al acumulador
            acc.push({
              nombre: recurso.nombre,
              descripcion: recurso.descripcion,
              cantidad: cantidad,
            });
          }

          return acc;
        },
        []
      );

      // Retornamos el espacio con los recursos agrupados
      return {
        ...espacio.dataValues,
        detalleRecursosEspacio: recursosAgrupados,
      };
    });

    // Enviar los datos agrupados como respuesta
    res.status(200).json(espaciosAgrupados);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los espacios" });
  }
};

export const getEspacioById = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await Espacio.findByPk(id, {
      include: [
        { model: EstadoEspacio, as: "estado" },
        { model: TipoEspacio, as: "tipoEspacio" },
      ],
    });

    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }

    res.status(200).json(espacio);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener el Espacio" });
  }
};

export const createEspacio = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre, descripcion, capacidad, id_estado, id_tipo_espacio } =
      req.body;

    // Crear el nuevo espacio
    const nuevoEspacio = await Espacio.create({
      nombre: nombre,
      descripcion: descripcion,
      capacidad: capacidad,
      estadoId: id_estado,
      tipoEspacioId: id_tipo_espacio,
    });

    // Enviar una respuesta al cliente con el ministerio creado
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
    console.log(req.body);
    const { id } = req.params;
    const { nombre } = req.body;
    const { descripcion } = req.body;
    const { capacidad } = req.body;
    const { id_estado } = req.body;
    const { id_tipo_espacio } = req.body;

    const espacio = await Espacio.findByPk(id);
    if (!espacio) {
      return res.status(404).json({ message: "Espacio no encontrado" });
    }

    const updates = {};
    //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
    if (id) updates.id = espacio.id;
    if (nombre) updates.nombre = nombre;
    if (descripcion) updates.descripcion = descripcion;
    if (capacidad) updates.capacidad = capacidad;
    if (id_estado) updates.estadoId = id_estado;
    if (id_tipo_espacio) updates.tipoEspacioId = id_tipo_espacio;

    // await Esácop.update(updates)
    await Espacio.update(updates, {
      where: { id: id },
    });

    res.status(200).json(espacio);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar el Espacio" });
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
      .json({ message: "Ha ocurrido un error al eliminar el Espacio" });
  }
};

export const getTiposEspacio = async (req, res) => {
  try {
    const tiposEspacio = await TipoEspacio.findAll();
    res.status(200).json(tiposEspacio);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ha ocurrido un error al obtener los tipos de espacios",
    });
  }
};
