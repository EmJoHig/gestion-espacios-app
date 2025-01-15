import Rol from '../models/Rol.js';
import Usuario from '../models/Usuario.js';
import bcrypt from "bcryptjs";
import axios from "axios";

//token para gestion users y roles
import { AUTH0_TOKEN } from "../config.js";

export const getRolesPorUsuario = async (req, res) => {
    try {

        const roles = await Rol.findAll();
        res.status(200).json(roles);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener roles' });
    }
};


export const getRolesAUTH0 = async (req, res) => {
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
          'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles',
          {
            headers: {
              'Authorization': `Bearer ${tokenAdmin}`,
            }
          }
        );
  
        if (response != null && (response.status == 200 || response.status == 201 || response.status == 204)) {
        //   console.log("response");
        //   console.log(response.data);
  
          res.status(200).json({data: response.data, status: response.status});
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


export const getRolById = async (req, res) => {
    try {
        const { id } = req.params;

        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Rol' });
    }
};


export const createRol = async (req, res) => {
    try {
        // const  id = req.user.sub;
        const { idUsuarioAuth0, rol } = req.body;

        const nameRol = rol.name;
        const descriptionRol = rol.description;

        //descomentar que anda chill en mi bd
        // const nuevoRol = await Rol.create({ name: nameRol, description: descriptionRol });
        // res.status(200).json(nuevoRol);
        //descomentar que anda chill


        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------

        //PRIMERO CREO EL ROL EN AUTH0 

        // Extrae el token del header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        const token = authHeader.split(' ')[1]; // Esto elimina "Bearer " del header
        //'https://gestion-espacios/api/v2/roles',

        // console.log("idUsuarioAuth0: ", idUsuarioAuth0);

        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------

        // CREAR ROL EN AUTH0
        // ESTO ANDA PERO HACERLO AL FINAL PARA QUE QUEDE COMPLETO

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
            const response = await axios.post(
                'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles',
                { name: nameRol, description: descriptionRol },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenAdmin}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (response != null && response.status == 200) {

                // console.log("response de alta rol auth0:  ", response.data);

                //----------   IMPORTANTE LEER ---------------
                //----------   IMPORTANTE LEER ---------------
                //----------   IMPORTANTE LEER ---------------
                // LA ASOCIACION DE LOS ROLES LA PUEDO HACER SOLO CON MI BD
                // EL USUARIO ADMIN VA A TENER SU ROL ADMIN, AL TENER ESE TIPO DE USUARIO PUEDE CREAR ROLES Y ASOCIARLOS A LOS USUARIOS
                // PERO NO EN AUTH0, SINO EN MI BD, DONDE SOLO TRABAJO LOS ROLES DE MI BD
                // MAS ADELANTE DEBERIA HACERSE TANTO EN AUTH0 COMO EN MI BD CUANDO SE HACE UN ROL NUEVO Y SE QUIERE ASOCIAR

                const idRolNuevo = response.data.id;

                const responseAsociarRol = await axios.post(
                    `https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/users/${idUsuarioAuth0}/roles`,
                    { roles: [idRolNuevo] },
                    {
                        headers: {
                            'Authorization': `Bearer ${tokenAdmin}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                //console.log("response de asociar rol auth0:  ", responseAsociarRol);

                // si se asocio bien el rol en auth0 lo doy de alta en mi bd
                if (responseAsociarRol != null && (responseAsociarRol.status == 200 || responseAsociarRol.status == 204)) {

                    const nuevoRol = await Rol.create({ name: nameRol, description: descriptionRol, idRolAUTH0: idRolNuevo });

                    if (nuevoRol != null) {
                        res.status(200).json(nuevoRol);
                    } else {
                        res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol al Usuario' });
                    }
                } else {
                    res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol en AUTH0' });
                }
            } else {
                res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol en AUTH0' });
            }
        }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};


export const updateRol = async (req, res) => {
    try {
        // const { _id } = req.params;
        const { name, description, id } = req.body;

        // console.log("req.body: ", req.body);   

        //primero lo edito en auth0
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
            const response = await axios.patch(
                'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles/' + id,
                { name: name, description: description },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenAdmin}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            if (response != null && response.status == 200) {
                //luego lo creo en mi bd
                // const rol = await Rol.findByPk(id);
                const rol = await Rol.findOne({ where: { idRolAUTH0: id } });

                if (!rol) {
                    return res.status(404).json({ message: 'Rol no encontrado' });
                }
                const updates = {};
                //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
                updates.id = rol.id;
                updates.name = name;
                updates.description = description;
                // await Rol.update(updates)
                await Rol.update(updates, { where: { id: rol.id } });

                res.status(200).json(response.data);
                
            } else {
                res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol en AUTH0' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol' });
    }
};

export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;

        // const rol = await Rol.findByPk(id);
        

        //primero lo elimino en auth0
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
            const response = await axios.delete(
                'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles/' + id,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenAdmin}`,
                    }
                }
            );

            if (response != null && response.status == 200) {

                //luego lo elimino en mi bd

                const rolbd = await Rol.findOne({ where: { idRolAUTH0: id } });

                if (!rolbd) {
                    return res.status(404).json({ message: 'Rol no encontrado' });
                }

                const rol = await Rol.destroy({ where: { idRolAUTH0: id }});

                if (!rol) {
                    return res.status(404).json({ message: 'Rol no encontrado' });
                }
                
                res.status(200).json({ message: 'Rol eliminado correctamente' });

            } else {
                res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol en AUTH0' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Rol' });
    }
};


//ASOCIAR ROL A USUARIO
export const asociarRolAlUsuario = async (req, res) => {
    try {
        //  idUsuario, idRol
        //  idUsuario: es el id de mi bd
        //  idRol: es el id de auth0
        const { idUsuario, idRol } = req.body;
        
        let rol = await Rol.findOne({ where: { idRolAUTH0: idRol } });

        // SI EL ROL DE AUTH0 NO SE ENCUENTRA EN MI BD, LO CREO :)
        if (!rol) {

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

                const responseGetRolAuth0 = await axios.get(
                  `https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles/${idRol}`,
                  {
                    headers: {
                      'Authorization': `Bearer ${tokenAdmin}`,
                    }
                  }
                );

                if(responseGetRolAuth0){

                    const nuevoRolBD = await Rol.create({
                        name: responseGetRolAuth0.data.name,
                        description: responseGetRolAuth0.data.description,
                        idRolAUTH0: responseGetRolAuth0.data.id
                    });

                    if(nuevoRolBD){
                        rol = nuevoRolBD;
                    }else{
                        return res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol en la bd' });
                    }                    
                }else{
                    return res.status(500).json({ message: 'Ha ocurrido un error al obtener el Rol en AUTH0' });
                }
            }
        }

        const usuario = await Usuario.findOne({ where: { id: idUsuario } }); 

        if (!usuario) {
            return res.status(404).json({ message: 'usuario no encontrado' });
        }
        
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

            const response = await axios.post(
                `https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/users/${usuario.idUsuarioAUTH0}/roles`,
                { roles: [rol.idRolAUTH0] },
                {
                    headers: {
                        'Authorization': `Bearer ${tokenAdmin}`,
                        'Content-Type': 'application/json',
                        'Cache-control': 'no-cache'
                    },
                }
            );

            if (response != null && (response.status == 200 || response.status == 204)) {

                const _usuario = await Usuario.findOne({ where: { id: idUsuario } });

                const idRolMibd = rol.id;

                if (_usuario) {
                    //se asocia el rol
                    //const idRolParseado = Number.isInteger(Number(idRol)) ? parseInt(idRol, 10) : null;
                    
                    const resp = await Usuario.update(
                        { rolId: idRolMibd }, // Campos a actualizar
                        { where: { id: idUsuario } } // Condición de búsqueda
                    );
        
                    res.status(200).json(resp);
                } else {
                    res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol al Usuario' });
                }
            } else {
                res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol en AUTH0' });
            }
        }

    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};