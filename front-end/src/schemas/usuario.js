import { z } from "zod";

export const RolSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});


export const UsuarioSchema = z.object({
  id: z.number(),
  nombreUsuario: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z.string({
    required_error: "El email es requerido",
  }).email("Email no válido"),

  fechaAlta: z.date({
    required_error: "La fecha de alta es requerida",
  }),

  rolId: z.number({
    required_error: "El ID del rol es requerido",
  }),

  rol: RolSchema,

  idUsuarioAUTH0: z.string({
    required_error: "idUsuarioAUTH0 es requerido",
  }),
});
