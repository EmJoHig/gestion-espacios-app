import { DataTypes, Model } from 'sequelize';
import db2 from '../database/db2.js';  

class Espacio extends Model {
  
}

Espacio.init({
  id: {type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
}, {
  sequelize: db2,
  modelName: 'Espacio',
  tableName: 'espacio',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

export default Espacio;
