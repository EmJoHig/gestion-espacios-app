import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import db2 from '../database/db2.js';  // Ajusta esta ruta según tu configuración de Sequelize

class Ministerio extends Model {
  
}

Ministerio.init({
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
}, {
  sequelize: db2,
  modelName: 'Ministerio',
  tableName: 'ministerio',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

export default Ministerio;