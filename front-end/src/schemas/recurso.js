import { z } from "zod";

export const recursoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripcion es requerida",
  }),
  cantidad: z.number({
    required_error: "Se requiere cantidad.",
  }),
});
