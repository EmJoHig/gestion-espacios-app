// import { config } from "dotenv";
import pkg from 'dotenv';
const { config } = pkg;
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gestionespaciosdb";
export const AUTH0_TOKEN = process.env.AUTH0_TOKEN || "";
