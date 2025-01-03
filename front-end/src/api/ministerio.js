import axios from "./axios";


export const getMinisteriosRequest = async (token) => {

    try {
        const response = await axios.get("http://localhost:3000/ministerio/get_ministerios", {
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
        const response = await axios.post("http://localhost:3000/ministerio/nuevo_ministerio", body, {
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
        const response = await axios.put(`http://localhost:3000/ministerio/editar_ministerio/${ministerio.id}`, ministerio, {
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
        const response = await axios.delete(`http://localhost:3000/ministerio/eliminar_ministerio/${id}`, {
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
        const response = await axios.post("http://localhost:3000/ministerio/asociar_responsable_ministerio", bodyUsuarioMinist, {
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

        const response = await axios.get("http://localhost:3000/ministerio/get_actividades_de_ministerio", {
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
