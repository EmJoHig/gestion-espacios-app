import axios from "./axios";

// export const getMinisteriosRequest = async () => axios.get("http://localhost:3000/ministerio/get_ministerios");

export const getMinisteriosRequest = async (token) => {
    // console.log("token: ");
    // console.log(token);

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


export const createMinisterioRequest = async (ministerio) => axios.post("http://localhost:3000/ministerio/nuevo_ministerio", ministerio);

export const updateMinisterioRequest = async (ministerio) => axios.put(`http://localhost:3000/ministerio/editar_ministerio/${ministerio.id}`, ministerio);
// export const updateMinisterioRequest = async (ministerio) => axios.put("http://localhost:3000/ministerio/", ministerio);

export const deleteMinisterioRequest = async (id) => axios.delete(`http://localhost:3000/ministerio/eliminar_ministerio/${id}`);

// export const getMinisterioRequest = async (id) => axios.get(`http://localhost:3000/ministerio/${id}`);


export const asociarResponsableAMinistRequest = async (token, bodyUsuarioMinist) => {
 
    // console.log('llega el body', bodyUsuarioRol);
    try {
        const response = await axios.post("http://localhost:3000/ministerio/asociar_responsable_ministerio", bodyUsuarioMinist, {
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


export const GetActividadesMinisterioRequest = async (token, bodyIdMinisterio) => {
 
    console.log('llega el body', bodyIdMinisterio);
    // try {
    //     const response = await axios.post("http://localhost:3000/ministerio/get_actividades_de_ministerio", bodyIdMinisterio, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
        
    //     return response;
    // } catch (error) {
    //     console.error('Error createRolRequest: ', error);
    //     throw error;
    // }
}
