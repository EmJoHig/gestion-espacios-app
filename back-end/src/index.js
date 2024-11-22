import app from "./app.js";
//import { connectDB } from "./database.js";
import db2 from "./database/db2.js";
import { createAdminUser } from "./libs/createUser.js";
import Usuario from "./models/Usuario.js";
import Ministerio from "./models/Ministerio.js";
import Rol from "./models/Rol.js";
import Recurso from "./models/Recurso.js";
import Actividad from "./models/Actividad.js";
import EstadoEspacio from "./models/EstadoEspacio.js";
import Espacio from "./models/Espacio.js";

async function main() {
  //await connectDB();
  try {
    await db2.authenticate();
    console.log("conexion exitosa");

    await Rol.sync({ alter: false });
    console.log("Tabla 'rol' sincronizada");

    await Usuario.sync({ alter: false }); // alter en false para no pisar las tablas
    console.log("Tabla 'users' sincronizada");

    await Ministerio.sync({ alter: false });
    console.log("Tabla 'ministerio' sincronizada");

    await Recurso.sync({ alter: false });
    console.log("Tabla 'Recurso' sincronizada");

    await Actividad.sync({ alter: false });
    console.log("Tabla 'actividad' sincronizada");

    await EstadoEspacio.sync({ alter: false });
    console.log("Tabla 'estado_espacio' sincronizada");

    await Espacio.sync({ alter: false });
    console.log("Tabla 'espacio' sincronizada");
  } catch (error) {
    console.log("error en la conexion", error);
  }
  // await createAdminUser();

  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });

  // console.log("Environment:", process.env.NODE_ENV);
}

main();
