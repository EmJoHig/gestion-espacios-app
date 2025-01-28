import axios from "./axios";
import { API_URL } from "../config";



export const getMinisteriosRequest = async (token) => {

    try {
        const response = await axios.get(`${API_URL}/ministerio/get_ministerios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching ministerios:', error);
        throw error;
    }
};


export const createMinisterioRequest = async (token, body) => {

    try {
        const response = await axios.post(`${API_URL}/ministerio/nuevo_ministerio`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error createMinisterio: ', error);
        throw error;
    }
}



export const updateMinisterioRequest = async (token, ministerio) => {

    try {
        const response = await axios.put(`${API_URL}/ministerio/editar_ministerio/${ministerio.id}`, ministerio, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error updateMinisterio: ', error);
        throw error;
    }
};



export const deleteMinisterioRequest = async (token, id) => {

    try {
        const response = await axios.delete(`${API_URL}/ministerio/eliminar_ministerio/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error deleteMinisterio: ', error);
        throw error;
    }
};



export const asociarResponsableAMinistRequest = async (token, bodyUsuarioMinist) => {

    try {
        const response = await axios.post(`${API_URL}/ministerio/asociar_responsable_ministerio`, bodyUsuarioMinist, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error asociarResponsableAMinist: ', error);
        throw error;
    }
}


export const GetActividadesMinisterioRequest = async (token, bodyIdMinisterio) => {
    
    try {

        const response = await axios.get(`${API_URL}/ministerio/get_actividades_de_ministerio`, {
            params: bodyIdMinisterio,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error GetActividadesMinisterio: ', error);
        throw error;
    }
}
