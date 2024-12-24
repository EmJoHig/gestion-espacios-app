import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import db2 from '../database/db2.js';  // Ajusta esta ruta según tu configuración de Sequelize
import Rol from '../models/Rol.js';
import Ministerio from '../models/Ministerio.js';

class Usuario extends Model {
  // async encryptPassword(password) {
  //   const salt = await bcrypt.genSalt(10);
  //   return await bcrypt.hash(password, salt);
  // }

  // async matchPassword(password) {
  //   return await bcrypt.compare(password, this.password);
  // }
}

Usuario.init({
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
    field: 'nombre_usuario'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    field: 'email'
  },
  // password: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  fechaAlta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_alta'
  },
  rolId: {  // Clave foránea hacia Rol
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'id'
    },
    allowNull: true,
    field: 'id_rol'
  },
  ministerioId: {  // Clave foránea hacia Rol
    type: DataTypes.INTEGER,
    references: {
      model: Ministerio,
      key: 'id'
    },
    allowNull: true,
    field: 'ministerioId'
  },
  idUsuarioAUTH0: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,  // Asegura que sea único para cada usuario
    field: 'id_usuario_auth0'
  }
}, {
  sequelize: db2,
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  version: false,
});

// Definir relación
Usuario.belongsTo(Rol, {
  foreignKey: 'rolId',
  as: 'rol', 
});

Usuario.belongsTo(Ministerio, {
  foreignKey: 'ministerioId',
  as: 'ministerio', 
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