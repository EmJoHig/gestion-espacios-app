import axios from "./axios";
import { API_URL } from "../config";


export const getRolesPorUsuarioRequest = async (token) => {

    try { 
        const response = await axios.get(`${API_URL}/rol/get_roles_por_usuario`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error getRolesRequest: ', error);
        throw error;
    }

};


export const getRolesAUTH0Request = async (token) => {

    try { 
        const response = await axios.get(`${API_URL}/rol/get_roles_auth0`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error getRolesRequest: ', error);
        throw error;
    }

};


export const createRolRequest = async (token, idUsuarioAuth0, rol) => {
 
    // console.log('llega el id', idUsuarioAuth0);
    const data = {
        idUsuarioAuth0,
        rol
    };
    try {
        const response = await axios.post(`${API_URL}/rol/nuevo_rol`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response;
    } catch (error) {
        console.error('Error createRolRequest: ', error);
        throw error;
    }
}


export const updateRolRequest = async (token, rol) => {
    
        try { 
            const response = await axios.put(`${API_URL}/rol/editar_rol/${rol.id}`, rol, {
                headers: {
                    Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
                },
            });
            return response;
        } catch (error) {
            console.error('Error getRolesRequest: ', error);
            throw error;
        }
};

export const deleteRolRequest = async (token, id) => {

    try { 
        const response = await axios.delete(`${API_URL}/rol/eliminar_rol/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error getRolesRequest: ', error);
        throw error;
    }

};


export const asociarRolAlUsuarioRequest = async (token, bodyUsuarioRol) => {
 
    // console.log('llega el id', idUsuarioAuth0);
    try {
        const response = await axios.post(`${API_URL}/rol/asociar_rol_usuario`, bodyUsuarioRol, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response;    
    } catch (error) {
        console.error('Error createRolRequest: ', error);
        throw error;
    }
}
