import axios from "./axios";

export const getActividadesRequest = async (token) => {
    try {
        const response = await axios.get("http://localhost:3000/actividad/get_actividades", {
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
        const response = await axios.post("http://localhost:3000/actividad/nueva_actividad", body, {
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
        const response = await axios.put(`http://localhost:3000/actividad/editar_actividad/${actividad.id}`, actividad, {
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
        const response = await axios.delete(`http://localhost:3000/actividad/eliminar_actividad/${id}`, {
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
