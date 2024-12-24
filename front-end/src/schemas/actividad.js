import { z } from "zod";

export const MinisterioSchema = z.object({
  id: z.number().int(),
  descripcion: z.string(),
});

export const ActividadSchema = z.object({
  id: z.number(),

  nombre: z.string({
    required_error: "El nombre es requerido",
  }),

  descripcion: z.string({
    required_error: "descripcion es requerido",
  }).email("Email no válido"),

  ministerioId: z.number({
    required_error: "El ID del minist es requerido",
  }),

  ministerio: MinisterioSchema,

  idUsuarioAUTH0: z.string({
    required_error: "idUsuarioAUTH0 es requerido",
  }),
});
