import app from "./app.js";
//import { connectDB } from "./database.js";
import db2 from "./database/db2.js";
import { createAdminUser } from "./libs/createUser.js";
import Usuario from "./models/Usuario.js";
import Ministerio from "./models/Ministerio.js";
import Rol from "./models/Rol.js";
import Recurso from "./models/Recurso.js";
import Espacio from "./models/Espacio.js";
import Reserva from "./models/Reserva.js";
import SolicitudReserva from "./models/SolicitudReserva.js";
import Actividad from "./models/Actividad.js";
import EstadoEspacio from "./models/EstadoEspacio.js";

async function main() {
  //await connectDB();
  try {
    await db2.authenticate();
    console.log("conexion exitosa");

    // Sincroniza todos los modelos con la base de datos
    await db2.sync({ alter: true });

    await Rol.sync({ alter: false });

    await EstadoEspacio.sync({ alter: false });

    await Usuario.sync({ alter: false }); // alter en false para no pisar las tablas

    await Ministerio.sync({ alter: false });

    await Recurso.sync({ alter: false });

    await Espacio.sync({ alter: false });

    await Actividad.sync({ alter: false });

    await Reserva.sync({ alter: false });

    await SolicitudReserva.sync({ alter: false });
  } catch (error) {
    console.log("error en la conexion", error);
  }
  //await createAdminUser();

  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

main();
