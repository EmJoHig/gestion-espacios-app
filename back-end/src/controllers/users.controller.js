import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    // const users = await Usuario.find();
    // const users = await Usuario.findAll();

    const users = await Usuario.findAll({
      include: [
        {
          model: Rol,
          as: "rol", // alias
          // attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Enviar una respuesta al cliente
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener el usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el correo electrónico y la contraseña del usuario
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);
    await user.update(updates);
    //await Usuario.update(user, { where: { id: id} });

    // Enviar una respuesta al cliente
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const user = await Usuario.destroy({
      where: { id: id },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar el usuario" });
  }
};
