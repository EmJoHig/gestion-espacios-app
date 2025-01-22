import { DataTypes, Model } from 'sequelize';
import db2 from '../database/db2.js';  
import EstadoSolicitud from "./EstadoSolicitud.js";
import Ministerio from "./Ministerio.js";
import Actividad from "./Actividad.js";
import Espacio from "./Espacio.js";

class Solicitud extends Model {}

Solicitud.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Si deseas que sea autoincremental
  },
  ministerioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Ministerio,
      key: "id",
    },
    allowNull: true,
    field: "id_ministerio", // Acá defino el nombre real de la columna en la BD.
  },
  espacioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: "id",
    },
    allowNull: true,
    field: "id_espacio", // Acá defino el nombre real de la columna en la BD.
  },
  actividadId: {
    type: DataTypes.INTEGER,
    references: {
      model: Actividad,
      key: "id",
    },
    allowNull: true,
    field: "id_actividad", // Acá defino el nombre real de la columna en la BD.
  },
  estadoSolicitudId: {
    type: DataTypes.INTEGER,
    references: {
      model: EstadoSolicitud,
      key: "id",
    },
    allowNull: true,
    field: "id_estado_solicitud",
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: db2,
  modelName: 'Solicitud',
  tableName: 'solicitud',
  timestamps: false, // Si no usas campos automáticos como createdAt y updatedAt
  // createdAt: false,  // Opcional: si decides manejar fechas manualmente
  // updatedAt: false,
  version: false,
});

Solicitud.belongsTo(EstadoSolicitud, {
  foreignKey: "estadoSolicitudId",
  as: "estadoSolicitud",
});

Solicitud.belongsTo(Ministerio, {
  foreignKey: "ministerioId",
  as: "ministerio",
});

Solicitud.belongsTo(Espacio, {
  foreignKey: "espacioId",
  as: "espacio",
});

Solicitud.belongsTo(Actividad, {
  foreignKey: "actividadId",
  as: "actividad",
});

export default Solicitud;