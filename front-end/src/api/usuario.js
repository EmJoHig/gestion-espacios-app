import axios from "./axios";
import { API_URL } from "../config";


// export const getUsuariosRequest = async () => axios.get("http://localhost:3000/usuarios");
export const getUsuariosRequest = async (token) => {

    try { 
        const response = await axios.get(`${API_URL}/usuarios/get_usuarios`, {
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


export const createUsuarioRequest = async (usuario) => axios.post("/usuarios", usuario);

export const updateUsuarioRequest = async (usuario) => axios.put(`/usuarios/${usuario._id}`, usuario);

export const deleteUsuarioRequest = async (id) => axios.delete(`/usuarios/${id}`);

export const getUsuarioRequest = async (id) => axios.get(`/usuarios/${id}`);


// CHEQUEA QUE EL USUARIO ESTE EN MI BD, SINO ESTA, LO CREA
export const getUsuarioAuth0Request = async (token, UsuarioAUTH0) => {

    const data = {
        UsuarioAUTH0
    };
    try {
        const response = await axios.post(`${API_URL}/usuarios/validar_usuario_auth0`, data, {
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


export const getUsuariosAUTH0Request = async (token) => {

    try { 
        const response = await axios.get(`${API_URL}/usuarios/get_usuarios_auth0`, {
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