import { DataTypes, Model } from 'sequelize';
import db2 from '../database/db2.js';  
import Espacio from './Espacio.js'; // Asegúrate de que las rutas sean correctas
import Ministerio from './Ministerio.js';
import Actividad from './Actividad.js';

class Reserva extends Model {}

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
    allowNull: true,
    references: {
      model: 'ministerio', // Asegúrate de que este modelo exista y tenga su tabla
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Ejemplo: podría ser null si el ministerio es eliminado
  },
  actividadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'actividad', // Asegúrate de que este modelo exista y tenga su tabla
      key: 'id',
    },
    onUpdate: 'CASCADE',
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaBaja: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: db2,
  modelName: 'Reserva',
  tableName: 'reserva',
  timestamps: false, // Si no usas campos automáticos como createdAt y updatedAt
  createdAt: false,  // Opcional: si decides manejar fechas manualmente
  updatedAt: false,
  version: false,
});

Reserva.associate = () => {
  Reserva.belongsTo(Espacio, { foreignKey: 'espacioId' }); // Relación con Espacio
  Reserva.belongsTo(Ministerio, { foreignKey: 'ministerioId' }); // Relación con Ministerio
  Reserva.belongsTo(Actividad, { foreignKey: 'actividadId' }); // Relación con Actividad
};

export default Reserva;