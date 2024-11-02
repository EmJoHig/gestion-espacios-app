import axios from "./axios";

// export const getUsuariosRequest = async () => axios.get("http://localhost:3000/usuarios");
export const getUsuariosRequest = async (token) => {

    try { 
        const response = await axios.get("http://localhost:3000/usuarios/get_usuarios", {
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
