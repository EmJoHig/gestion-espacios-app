import { DataTypes, Model } from 'sequelize';
import db2 from '../database/db2.js';  

class SolicitudReserva extends Model {}

Reserva.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Si deseas que sea autoincremental
  },
  espacioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'espacio', // Nombre de la tabla referenciada
      key: 'id',        // Columna referenciada
    },
    onUpdate: 'CASCADE', // Opcional: comportamiento en actualización
    onDelete: 'CASCADE', // Opcional: comportamiento en eliminación
  },
  ministerioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ministerio', // Asegúrate de que este modelo exista y tenga su tabla
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Ejemplo: podría ser null si el ministerio es eliminado
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db2,
  modelName: 'SolicitudReserva',
  tableName: 'solicitudreserva',
  timestamps: false, // Si no usas campos automáticos como createdAt y updatedAt
  createdAt: false,  // Opcional: si decides manejar fechas manualmente
  updatedAt: false,
  version: false,
});

export default SolicitudReserva;