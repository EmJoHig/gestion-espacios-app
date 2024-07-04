import { z } from "zod";

export const ministerioSchema = z.object({
  codigo: z.string({
    required_error: "El codigo es requerido padre",
  }),
  descripcion: z.string({
    required_error: "Se requiere descripcion p.",
  }),
});
