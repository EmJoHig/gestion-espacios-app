import Espacio from "./Espacio.js";
import Recurso from "./Recurso.js";
import DetalleRecurso from "./DetalleRecurso.js";

// Definir las relaciones entre los modelos
const defineAssociations = () => {
  // Relación Espacio -> DetalleRecurso
  Espacio.hasMany(DetalleRecurso, {
    foreignKey: "espacioId",
    as: "detalleRecursosEspacio", // Alias único para evitar conflicto
  });

  // Relación DetalleRecurso -> Espacio
  DetalleRecurso.belongsTo(Espacio, {
    foreignKey: "espacioId",
    as: "espacioDetalleRecurso", // Alias único para evitar conflicto
  });

  // Relación DetalleRecurso -> Recurso
  DetalleRecurso.belongsTo(Recurso, {
    foreignKey: "recursoId",
    as: "recurso", // Alias para la relación con Recurso
  });

  // Relación Recurso -> DetalleRecurso con CASCADE
  Recurso.hasMany(DetalleRecurso, {
    foreignKey: "recursoId",
    as: "detalleRecursos", // Alias para la relación con DetalleRecurso
    onDelete: "CASCADE", // Cuando se elimine un Recurso, se eliminarán los detalles asociados
  });
};

export default defineAssociations;
