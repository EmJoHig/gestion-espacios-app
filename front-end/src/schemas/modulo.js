import { z } from "zod";

export const moduloSchema = z.object({
    id: z.string(),
    codigo: z.string({
        required_error: "El codigo es requerido padre",
    }),
    descripcion: z.string({
        required_error: "Se requiere descripcion p.",
    }),
});
