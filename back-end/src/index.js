import app from "./app.js";
import db2 from "./database/db2.js";
import defineAssociations from "./models/associations.js"; // Importa las asociaciones
import Usuario from "./models/Usuario.js";
import Ministerio from "./models/Ministerio.js";
import Rol from "./models/Rol.js";
import Recurso from "./models/Recurso.js";
import Espacio from "./models/Espacio.js";
import Reserva from "./models/Reserva.js";
import Solicitud from "./models/Solicitud.js";
import Actividad from "./models/Actividad.js";
import EstadoEspacio from "./models/EstadoEspacio.js";
import EstadoSolicitud from "./models/EstadoSolicitud.js";
import TipoEspacio from "./models/TipoEspacio.js";
import DetalleRecurso from "./models/DetalleRecurso.js";

async function main() {
  try {
    await db2.authenticate();
    console.log("conexion exitosa");

    // Definir las relaciones entre los modelos
    defineAssociations();

    // Sincroniza todos los modelos con la base de datos
    await db2.sync({ alter: true });

    // Sincronizar modelos individuales
    await Rol.sync({ alter: false });
    await EstadoEspacio.sync({ alter: false });
    await Usuario.sync({ alter: false });
    await Ministerio.sync({ alter: false });
    await Recurso.sync({ alter: false });
    await Espacio.sync({ alter: false });
    await Actividad.sync({ alter: false });
    await Reserva.sync({ alter: false });
    await Solicitud.sync({ alter: false });
    await EstadoSolicitud.sync({ alter: false });
    await TipoEspacio.sync({ alter: false });
    await DetalleRecurso.sync({ alter: false });
  } catch (error) {
    console.log("error en la conexion", error);
  }

  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

main();
