import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js";
import EstadoEspacio from "./EstadoEspacio.js";

class Espacio extends Model {}

Espacio.init(
  {
    // id? En Sequelize, el atributo id es tratado automáticamente si no se define explicitamente.

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      trim: true,
    },
    //estado_espacioId se refiere a la clave foránea dentro del modelo de datos y no el la BD.
    estado_espacioId: {
      type: DataTypes.INTEGER,
      references: {
        model: EstadoEspacio,
        key: "id",
      },
      allowNull: false,
      field: "id_estado_espacio", // Acá defino el nombre real de la columna en la BD.
    },
  },
  {
    sequelize: db2,
    modelName: "Espacio",
    tableName: "espacio",
    timestamps: false, // Por defecto, Sequelize añade automáticamente dos columnas en cada tabla que crea: createdAt y updatedAt. Estas columnas sirven para almacenar las fechas de creación y última actualización de un registro.
    //createdAt: "createdAt", // No hace falta si timetamps es false, esto es para personalizar el nombre de la columna
    //updatedAt: "updatedAt", // Idem.
    version: false, // Evita crear la columna version.
  }
);

Espacio.belongsTo(EstadoEspacio, {
  foreignKey: "estado_espacioId",
  as: "estado_espacio", // Establece un alias para acceder a la relación de manera más clara cuando hagas las consultas.
});

export default Espacio;
