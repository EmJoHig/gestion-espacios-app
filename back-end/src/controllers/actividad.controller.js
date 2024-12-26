import Actividad from "../models/Actividad.js";
import Ministerio from "../models/Ministerio.js";


export const getActividades = async (req, res) => {
  try {

    const actividades = await Actividad.findAll({ include: [{ model: Ministerio, as: 'ministerio' }] });

    // Enviar una respuesta al cliente
    res.status(200).json(actividades);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener las actividades." });
  }
};

// export const getActividadById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const actividad = await Actividad.findByPk(id);
//     if (!actividad) {
//       return res.status(404).json({ message: "Actividad no encontrada." });
//     }

//     res.status(200).json(actividad);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Ha ocurrido un error al obtener la Actividad." });
//   }
// };

export const createActividad = async (req, res) => {
  try {

    const { nombre, descripcion, ministerioId } = req.body;

    // Crear la actividad nueva.
    const nuevaActividad = await Actividad.create({
      nombre,
      descripcion,
      ministerioId,
    });

    // Enviar una respuesta al cliente con la actividad nueva.
    res.status(200).json(nuevaActividad);
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


export const getActividadesSinMinisterio = async (req, res) => {
  try {

    const actividades = await Actividad.findAll({
      where: { ministerioId: null },
      include: [{ model: Ministerio, as: 'ministerio' }]
    });

    if (!actividades) {
      return res.status(404).json({ message: "No hay actividades sin ministerio." });
    }

    res.status(200).json(actividades);

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener las actividades." });
  }
};


//ASOCIAR ACTS A MINISTERIO
export const asociarActividadAMinisterio = async (req, res) => {
  try {
      const { idsActividades, idMinisterio } = req.body;

      const _ministerio = await Ministerio.findOne({ where: { id: idMinisterio } });

      if (_ministerio) {
        
        const resp = await Promise.all(idsActividades.map(async (idAct) => {
          return Actividad.update(
            { ministerioId: idMinisterio },
            { where: { id: idAct } }
          );
        }));

          if (resp && resp[0] >= 0) {
              res.status(200).json({ message: 'Actividad asociada al Ministerio' });
          } else {
              res.status(404).json({ message: 'No se pudo asociar la Actividad al ministerio. Actividad no encontrada o sin cambios' });
          }
      } else {
          res.status(500).json({ message: 'Ha ocurrido un error al asociar Actividad a Ministerio' });
      }
  } catch (error) {
      console.error('Error al asociar Actividad a Ministerio: ', error);
      res.status(500).json({ message: 'Ha ocurrido un error al asociar Actividad a Ministerio' });
  }
};



// QUITA LA ACTIVIDAD DEL MINISTERIO
export const quitarActividadAMinisterio = async (req, res) => {
  try {
      const { idActividad, idMinisterio } = req.body;

      const _ministerio = await Ministerio.findOne({ where: { id: idMinisterio } });

      if (_ministerio) {

          const resp = await Actividad.update(
              { ministerioId: null },
              { where: { id: idActividad } }
          );

          if (resp && resp[0] >= 0) {
              res.status(200).json({ message: 'Se quito la actividad del Ministerio.' });
          } else {
              res.status(404).json({ message: 'No se pudo quitar la actividad del Ministerio.' });
          }

      } else {
          res.status(500).json({ message: 'Ha ocurrido un error al quitar la actividad del Ministerio' });
      }
  } catch (error) {
      console.error('Ha ocurrido un error al quitar la actividad del Ministerio: ', error);
      res.status(500).json({ message: 'Ha ocurrido un error al quitar la actividad del Ministerio' });
  }
};