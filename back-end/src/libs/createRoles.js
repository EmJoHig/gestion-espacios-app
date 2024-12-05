import Rol from "../models/Rol.js";

export const createRoles = async () => {
  const RolAdmin = await Rol.findOne({
    where: { name: "admin" },
  });

  if (RolAdmin) return;

  const newUser = new Usuario({
    username: "admin",
    email: "admin@localhost.com",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};
