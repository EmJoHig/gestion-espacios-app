import { z } from "zod";

export const UsuarioSchema = z.object({
  nombre: z.string({
    required_error: "Title is required",
  }),
  apellido: z.string({
    required_error: "apellido is required",
  }),
  dni: z.string({
    required_error: "dni is required",
  }),
});
