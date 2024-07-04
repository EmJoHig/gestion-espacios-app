import axios from "./axios";

export const getUsuariosRequest = async () => axios.get("http://localhost:3000/usuarios");

export const createUsuarioRequest = async (usuario) => axios.post("/usuarios", usuario);

export const updateUsuarioRequest = async (usuario) => axios.put(`/usuarios/${usuario._id}`, usuario);

export const deleteUsuarioRequest = async (id) => axios.delete(`/usuarios/${id}`);

export const getUsuarioRequest = async (id) => axios.get(`/usuarios/${id}`);
