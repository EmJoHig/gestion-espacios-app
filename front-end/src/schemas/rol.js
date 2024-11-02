import { z } from "zod";

export const rolSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "El name es requerido",
  }),
  description: z.string({
    required_error: "Se requiere descripcion",
  }),
});
