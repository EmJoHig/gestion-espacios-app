import Usuario from "../models/Usuario.js";

export const createAdminUser = async () => {
  const userFound = await Usuario.findOne({ email: "admin@localhost.com" });

  if (userFound) return;

  const newUser = new Usuario({
    username: "admin",
    email: "admin@localhost.com",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};
