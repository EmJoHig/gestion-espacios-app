import axios from "./axios";

export const getRecursosRequest = async (token) => {
    try {
        const response = await axios.get("http://localhost:3000/recurso/get_recursos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error) {
        console.error('Error fetching recursos:', error);
        throw error;
    }
};


// export const createRecursoRequest = async (recurso) => axios.post("http://localhost:3000/recurso/nuevo_recurso", recurso);
export const createRecursoRequest = async (token, body) => {

    try {
        const response = await axios.post("http://localhost:3000/recurso/nuevo_recurso", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error createRecurso: ', error);
        throw error;
    }
}



// export const updateRecursoRequest = async (recurso) => axios.put(`http://localhost:3000/recurso/editar_recurso/${recurso.id}`, recurso);
export const updateRecursoRequest = async (token, recurso) => {

    try {
        const response = await axios.put(`http://localhost:3000/recurso/editar_recurso/${recurso.id}`, recurso, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error updateRecurso: ', error);
        throw error;
    }
};



// export const deleteRecursoRequest = async (id) => axios.delete(`http://localhost:3000/recurso/eliminar_recurso/${id}`);
export const deleteRecursoRequest = async (token, id) => {

    try {
        const response = await axios.delete(`http://localhost:3000/recurso/eliminar_recurso/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,// ENVIO EL TOKEN NORMAL PARA QUE VALIDE QUE ESTA AUTENTICADO
            },
        });
        return response;
    } catch (error) {
        console.error('Error deleteRecurso: ', error);
        throw error;
    }
};

