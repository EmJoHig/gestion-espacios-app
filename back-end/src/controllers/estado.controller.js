import EstadoEspacio from "../models/EstadoEspacio.js";

export const getEstados = async (req, res) => {
  try {
    const estados = await EstadoEspacio.findAll();
    res.status(200).json(estados); // Envio en un json los datos
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los estados." });
  }
};
