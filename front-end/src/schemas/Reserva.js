import { z } from "zod";

export const ReservaSchema = z.object({
    id: z.number().int(),

    espacioId: z.number(),
    espacio: z.object({
        id: z.number(),
        descripcion: z.string(),
    }),

    ministerioId: z.number().nullable(), // Puede ser null según la BD
    ministerio: z.object({
        id: z.number(),
        descripcion: z.string(),
    }).nullable(),

    actividadId: z.number(),
    actividad: z.object({
        id: z.number(),
        descripcion: z.string(),
    }),

    fechaInicio: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "La fecha de inicio no es válida",
    }),

    fechaFin: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "La fecha de fin no es válida",
    }),

    fechaBaja: z.string().nullable().refine((date) => date === null || !isNaN(new Date(date).getTime()), {
        message: "La fecha de baja no es válida",
    }),
});
