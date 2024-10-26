import axios from "./axios";

export const getRolesRequest = async (token) => {
    // console.log("token: ");
    // console.log(token);

    // const domain = 'dev-zgzo7qc6w6kujif0.us.auth0.com';
    // const clientId = 'MReNmdTUf5BlAdAZuUr3uc65GTcaTklw';
    // const clientSecret = 'TU_CLIENT_SECRET'; // Reemplaza esto con tu client secret
    // const audience = 'https://gestion-espacios/api';

    try {

        // const responseToken = await axios.post(`https://${domain}/oauth/token`, {
        //     client_id: clientId,
        //     client_secret: clientSecret,
        //     audience: audience,
        //     grant_type: 'client_credentials'
        // });

        // console.log("TOKEN QUE PIDO MANUAL: ");
        // console.log(responseToken.data);

        //ESTE GET ROLES
        // va a buscar a la base de datos todos los roles de auth0 del respectivo usuario
        // 
        const response = await axios.get("http://localhost:3000/rol/get_roles", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};


export const createRolRequest = async (rol) => axios.post("https://{yourDomain}/api/v2/users/USER_ID/roles", rol);

// export const createRolRequest = async (rol) => axios.post("http://localhost:3000/rol/nuevo_rol", rol);

export const updateRolRequest = async (rol) => axios.put(`http://localhost:3000/rol/editar_rol/${rol.id}`, rol);

export const deleteRolRequest = async (id) => axios.delete(`http://localhost:3000/rol/eliminar_rol/${id}`);
