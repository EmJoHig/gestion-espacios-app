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


export const createRecursoRequest = async (recurso) => axios.post("http://localhost:3000/recurso/nuevo_recurso", recurso);

export const updateRecursoRequest = async (recurso) => axios.put(`http://localhost:3000/recurso/editar_recurso/${recurso.id}`, recurso);
// export const updateRecursoRequest = async (recurso) => axios.put("http://localhost:3000/recurso/", recurso);

export const deleteRecursoRequest = async (id) => axios.delete(`http://localhost:3000/recurso/eliminar_recurso/${id}`);

// export const getRecursoRequest = async (id) => axios.get(`http://localhost:3000/recurso/${id}`);
