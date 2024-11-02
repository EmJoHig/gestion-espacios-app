import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import db2 from '../database/db2.js';  // Ajusta esta ruta según tu configuración de Sequelize

class Recurso extends Model {
  
}

Recurso.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    trim: true,
  },
}, {
  sequelize: db2,
  modelName: 'Recurso',
  tableName: 'recurso',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

export default Recurso;