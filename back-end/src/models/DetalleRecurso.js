import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js";
import Recurso from "./Recurso.js"; // Importamos Recurso, pero no se establecen relaciones aquí

class DetalleRecurso extends Model {}

DetalleRecurso.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, trim: true },
    // Referencias de espacioId y recursoId
    espacioId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Espacio", // Definir la referencia a la tabla Espacio
        key: "id",
      },
      allowNull: true,
      field: "id_espacio",
    },
    recursoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Recurso", // Definir la referencia a la tabla Recurso
        key: "id",
      },
      allowNull: true,
      field: "id_recurso",
    },
  },
  {
    sequelize: db2,
    modelName: "DetalleRecurso",
    tableName: "detalle_recurso",
    timestamps: false,
  }
);

export default DetalleRecurso;
