import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import db2 from '../database/db2.js';  // Ajusta esta ruta según tu configuración de Sequelize

class Rol extends Model {
  
}

Rol.init({
  id: {type: DataTypes.INTEGER,
    primaryKey: true},
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  idRolAUTH0: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,  // Asegura que sea único para cada usuario
    field: 'id_rol_auth0'
  }
}, {
  sequelize: db2,
  modelName: 'Rol',
  tableName: 'rol',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

export default Rol;