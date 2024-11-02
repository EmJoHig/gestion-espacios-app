import Rol from '../models/Rol.js';
import Usuario from '../models/Usuario.js';
import bcrypt from "bcryptjs";
import axios from "axios";

//token para gestion users y roles
import { AUTH0_TOKEN } from "../config.js";

export const getRolesPorUsuario = async (req, res) => {
    try {
        // const authHeader = req.headers.authorization;

        // if (!authHeader) {
        //     return res.status(401).json({ message: 'Token no proporcionado' });
        // }

        // const token = authHeader.split(' ')[1];

        // const { userID } = req.body;

        // const response = await axios.get(
        //     `https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/users/${userID}/roles`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${AUTH0_TOKEN}`,
        //         }
        //     }
        // );

        const roles = await Rol.findAll();
        res.status(200).json(roles);

        // if(response != null && response.status == 200){
            
        //     // const roles = await Rol.findAll();
        //     // res.status(200).json(roles);
            
        // }else{
        //     res.status(500).json({ message: 'Ha ocurrido un error al obtener roles' });
        // }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener roles' });
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

        console.log('ROL : ', rol);
        console.log('req.body: ', idUsuarioAuth0);
        // res.status(201).json({message: 'Rol creado'});

        const nameRol = rol.name;
        const descriptionRol = rol.description;

        const nuevoRol = await Rol.create({ nameRol, descriptionRol });

        res.status(201).json(nuevoRol);
        
        // if(nuevoRol){
            //----------   IMPORTANTE LEER ---------------
            //----------   IMPORTANTE LEER ---------------
            //----------   IMPORTANTE LEER ---------------

            // ESTO ESTA BIEN PERO CUANDO ESTE CON AUTH0 LO SIGO
            //lo asocio al usuario logueado
            //voy a buscar el usuario por el id de auth0 a mi bd
            
            // const _usuario = await Usuario.findOrBuild({ where: { id_usuario_auth0: idUsuarioAuth0 }});

            // if(_usuario){
            //     //se asocia el rol
            //     _usuario.rolId = nuevoRol.id;
            //     console.log('USUARIO con rol actualizado: ', _usuario);
                
            //     const resp = await Usuario.update(_usuario, {
            //         where: { idUsuarioAUTH0: idUsuarioAuth0 }
            //     });

            //     console.log('RESPUESTA UPDATE USUARIO: ', resp);
            //     res.status(201).json(resp);
            // }

            // res.status(201).json(nuevoRol);
        // }

        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------

        // //PRIMERO CREO EL ROL EN AUTH0 
        
        // Extrae el token del header Authorization
        // const authHeader = req.headers.authorization;
        // if (!authHeader) {
        //     return res.status(401).json({ message: 'Token no proporcionado' });
        // }
        // const token = authHeader.split(' ')[1]; // Esto elimina "Bearer " del header
        // 'https://gestion-espacios/api/v2/roles',


        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------
        //----------   IMPORTANTE LEER ---------------

        // CREAR ROL EN AUTH0
        // ESTO ANDA PERO HACERLO AL FINAL PARA QUE QUEDE COMPLETO
        // const response = await axios.post(
        //     'https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/roles',
        //     { name, description },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${AUTH0_TOKEN}`,
        //             'Cache-Control': 'no-cache'
        //         }
        //     }
        // );
        // ESTO ANDA 


        // if(response != null && response.status == 200){
            
            //----------   IMPORTANTE LEER ---------------
            //----------   IMPORTANTE LEER ---------------
            //----------   IMPORTANTE LEER ---------------
            // LA ASOCIACION DE LOS ROLES LA PUEDO HACER SOLO CON MI BD
            // EL USUARIO ADMIN VA A TENER SU ROL ADMIN, AL TENER ESE TIPO DE USUARIO PUEDE CREAR ROLES Y ASOCIARLOS A LOS USUARIOS
            // PERO NO EN AUTH0, SINO EN MI BD, DONDE SOLO TRABAJO LOS ROLES DE MI BD
            // MAS ADELANTE DEBERIA HACERSE TANTO EN AUTH0 COMO EN MI BD CUANDO SE HACE UN ROL NUEVO Y SE QUIERE ASOCIAR
            
            // ACA DEBERIA HACER LA ASOCIACION DEL ROL CON EL USUARIO EN AUTH0, PERO LA DEJO PARA DESPUES
            // const responseAsociarRol = await axios.post(
            //     `https://dev-zgzo7qc6w6kujif0.us.auth0.com/api/v2/users/${"idUsuario"}/roles`,
            //     { name, description },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Authorization: `Bearer ${AUTH0_TOKEN}`,
            //             'Cache-Control': 'no-cache'
            //         }
            //     }
            // );

            //REALIZO LA ASOSIACION DEL ROL CON EL USUARIO EN MI BD QUE TIENE EL ROL ADMIN


        // }else{
        //     res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
        // }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};


export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        const updates = {};
        //USO TODAS LAS PROPIEDADES PORQUE EL PUT SOLO DEJA ACTUALIZAR TODO EL OBJETO
        if (id) updates.id = rol.id;
        if (name) updates.name = name;
        if (description) updates.description = description;

        // await Rol.update(updates)
        await Rol.update(updates, {
            where: { id: id }
        });

        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Rol' });
    }
};

export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.destroy({
            where: { id: id }
        })
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        // Enviar una respuesta al cliente
        res.status(200).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el Rol' });
    }
};


//ASOCIAR ROL A USUARIO
export const asociarRolAlUsuario = async (req, res) => {
    try {
        const { idUsuario, idRol } = req.body;

        const _usuario = await Usuario.findOne({ where: { id: idUsuario }});

        if(_usuario){
            //se asocia el rol
            const idRolPaseado = Number.isInteger(Number(idRol)) ? parseInt(idRol, 10) : null;

            const resp = await Usuario.update(
                { rolId: idRolPaseado }, // Campos a actualizar
                { where: { id: idUsuario } } // Condición de búsqueda
            );

            res.status(201).json(resp);
        }else{
            res.status(500).json({ message: 'Ha ocurrido un error al asociar el Rol al Usuario' });
        }
    } catch (error) {
        console.error('Error al crear el rol:', error);
        res.status(500).json({ message: 'Ha ocurrido un error al crear el Rol' });
    }
};