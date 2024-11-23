import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js"; // Ajusta esta ruta según tu configuración de Sequelize.
import Espacio from "./Espacio.js";

class Recurso extends Model {}

Recurso.init(
  {
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
    //espacioId se refiere a la clave foránea dentro del modelo de datos y no el la BD.
    espacioId: {
      type: DataTypes.INTEGER,
      references: {
        model: Espacio,
        key: "id",
      },
      allowNull: false,
      field: "id_espacio", // Acá defino el nombre real de la columna en la BD.
    },
  },
  {
    sequelize: db2,
    modelName: "Recurso",
    tableName: "recurso",
    timestamps: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    version: false,
  }
);

// Ahora establezco la relación entre los modelos: Recurso y Espacio.
Recurso.belongsTo(Espacio, {
  foreignKey: "espacioId",
  as: "espacio", // Establece un alias para acceder a la relación de manera más clara cuando hagas las consultas.
});

export default Recurso;
