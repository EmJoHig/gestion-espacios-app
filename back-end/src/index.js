import app from "./app.js";
import { connectDB } from "./database.js";
import { createAdminUser } from "./libs/createUser.js";

async function main() {
  await connectDB();
  await createAdminUser();
  
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });

  // console.log("Environment:", process.env.NODE_ENV); 
}

main();
