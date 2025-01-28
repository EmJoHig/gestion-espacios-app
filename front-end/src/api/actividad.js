import axios from "./axios";
import { API_URL } from "../config";


export const getActividadesRequest = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/actividad/get_actividades`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error) {
        console.error('Error fetching actividads:', error);
        throw error;
    }
};


export const createActividadRequest = async (token, body) => {

    try {
        const response = await axios.post(`${API_URL}/actividad/nueva_actividad`, body, {
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


export const updateActividadRequest = async (token, actividad) => {
    console.log('llega el body', actividad);

    try {
        const response = await axios.put(`${API_URL}/actividad/editar_actividad/${actividad.id}`, actividad, {
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

export const deleteActividadRequest = async (token, id) => {

    try {
        const response = await axios.delete(`${API_URL}/actividad/eliminar_actividad/${id}`, {
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


export const asociarActividadAMinistRequest = async (token, actsMinisterioBody) => {

    try {
        const response = await axios.post(`${API_URL}/actividad/asociar_actividad_a_ministerio`, actsMinisterioBody, {
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


export const GetActividadesSinMinisterioRequest = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/actividad/get_actividades_sin_ministerio`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error) {
        console.error('Error fetching actividads:', error);
        throw error;
    }
};


export const quitarActividadAMinisterioRequest = async (token, actMinisterioBody) => {

    try {
        const response = await axios.post(`${API_URL}/actividad/quitar_actividad_a_ministerio`, actMinisterioBody, {
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