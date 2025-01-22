import { z } from "zod";

export const MinisterioSchema = z.object({
    id: z.number(),
    descripcion: z.string(),
});

export const EspacioSchema = z.object({
    id: z.number(),
    descripcion: z.string(),
});

export const ActividadSchema = z.object({
    id: z.number(),
    descripcion: z.string(),
});

export const EstadoSolicitudSchema = z.object({
    id: z.number(),
    descripcion: z.string(),
});

export const SolicitudSchema = z.object({
    id: z.number().int(),

    ministerioId: z.number(), // Puede ser opcional según el modelo
    ministerio: MinisterioSchema,

    espacioId: z.number(),
    espacio: EspacioSchema,

    actividadId: z.number(),
    actividad: ActividadSchema,

    estadoSolicitudId: z.number(),
    estadoSolicitud: EstadoSolicitudSchema,

    fechaInicio: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "La fecha de inicio no es válida",
    }).optional(),

    fechaFin: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "La fecha de fin no es válida",
    }).optional(),
});
