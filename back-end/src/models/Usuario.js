import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import db2 from '../database/db2.js';  // Ajusta esta ruta según tu configuración de Sequelize

class Usuario extends Model {
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async matchPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Usuario.init({
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: db2,
  modelName: 'Usuario',
  tableName: 'users',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

// Hooks para encriptar la contraseña antes de guardar
Usuario.addHook('beforeCreate', async (user) => {
  if (user.password) {
    user.password = await user.encryptPassword(user.password);
  }
});

Usuario.addHook('beforeUpdate', async (user) => {
  if (user.password) {
    user.password = await user.encryptPassword(user.password);
  }
});

export default Usuario;