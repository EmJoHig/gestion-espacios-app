import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import Ministerio from "../models/Ministerio.js";
import bcrypt from "bcryptjs";
import axios from "axios";

export const getUsers = async (req, res) => {
  try {
    // const users = await Usuario.find();
    // const users = await Usuario.findAll();

    const users = await Usuario.findAll({ include: [{ model: Rol, as: 'rol', }, { model: Ministerio, as: 'ministerio' }] });

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
    const { id, nombre, apellido, nombreUsuario, dni, telefono } = req.body;

    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updates = {};
    if (nombre) updates.nombre = nombre;
    if (apellido) updates.apellido = apellido;
    if (nombreUsuario) updates.nombreUsuario = nombreUsuario;
    if (dni) updates.dni = dni;
    if (telefono) updates.telefono = telefono;

    const [updatedRows] = await Usuario.update(updates, {
      where: { id: id }
    });

    if (updatedRows < 1) {
      return res.status(400).json({ message: 'No se pudo editar el usuario' });
    }

    const updatedUser = await Usuario.findByPk(id);

    if (updatedUser === null) {
      return res.status(400).json({ message: 'No se pudo editar el usuario' });
    } else {
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ha ocurrido un error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // // Buscar un usuario por su ID en la base de datos
    // const user = await Usuario.destroy({
    //   where: { id: id },
    // });
    // if (!user) {
    //   return res.status(404).json({ message: "Usuario no encontrado" });
    // }
    // // Enviar una respuesta al cliente
    // res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al eliminar el usuario" });
  }
};


export const createUser = async (req, res) => {
  try {

    const { userData } = req.body;

    console.log("userData");
    console.log(userData);

    // const nuevoRol = await Usuario.create({ nombreUsuario: userData.username, email: userData.email, idUsuarioAUTH0: userData.auth0_user_id });

    // if (nuevoRol != null) {
    //   res.status(200).json(nuevoRol);
    // } else {
    //   res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol al Usuario' });
    // }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear el usuario' });
  }

}



export const validarUsuarioAUTH0 = async (req, res) => {
  try {

    const { UsuarioAUTH0 } = req.body;

    const _usuario = await Usuario.findOne({ where: { idUsuarioAUTH0: UsuarioAUTH0.sub } });

    // si no existe, lo creo
    if (!_usuario) {

      const rolCONSULTA = await Rol.findOne({ where: { name: 'CONSULTA' } });

      if (!rolCONSULTA) {
        return res.status(500).json({ message: 'rol no encontrado' });
      }

      const nuevoUsuario = await Usuario.create({
        nombreUsuario: UsuarioAUTH0.name,
        email: UsuarioAUTH0.email,
        idUsuarioAUTH0: UsuarioAUTH0.sub,
        nombre: UsuarioAUTH0.given_name,
        apellido: UsuarioAUTH0.family_name,
        telefono: UsuarioAUTH0.phone_number,
        dni: '',
        rolId: rolCONSULTA.id,
      });

      if (nuevoUsuario != null) {
        res.status(200).json({ message: "" });
      } else {
        res.status(500).json({ message: 'Ha ocurrido un error al crear Usuario' });
      }

    } else {
      res.status(200).json({ message: 'ya esta creado' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear el usuario' });
  }

}


export const getUsersAUTH0 = async (req, res) => {
  try {

    const responseAUTH0 = await axios.post(`https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token`, {
      client_id: "MReNmdTUf5BlAdAZuUr3uc65GTcaTklw",
      client_secret: "e9U8ISCwqcZX9BCIIysJtk23D6XUziqHdLWhhv0jV6csW4_C9deHZ_q45nGLZCBP",
      audience: "https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/",// llamo al audience de el management api
      grant_type: 'client_credentials',
    });

    if (responseAUTH0.status != 200) {
      return res.status(500).json({ message: 'Ha ocurrido un error al obtener el token' });
    }
    else {
      const tokenAdmin = responseAUTH0.data.access_token;
      const response = await axios.get(
        'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/users',
        {
          headers: {
            'Authorization': `Bearer ${tokenAdmin}`,
          }
        }
      );

      if (response != null && (response.status == 200 || response.status == 201 || response.status == 204)) {
        // console.log("response");
        // console.log(response);

        res.status(200).json({ data: response.data, status: response.status });
      } else {
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol en AUTH0' });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener los usuarios" });
  }
};


export const getUserByIdAUTH0 = async (req, res) => {
  try {

    const { idUsuarioAUTH0 } = req.body;

    const _user = await Usuario.findOne({ where: { idUsuarioAUTH0: idUsuarioAUTH0 }, include: [{ model: Rol, as: 'rol', }] });

    if (!_user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(_user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al obtener el usuario" });
  }
};