import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js";
import EstadoEspacio from "./EstadoEspacio.js";
import TipoEspacio from "./TipoEspacio.js";

class Espacio extends Model {}

Espacio.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estadoId: {
      type: DataTypes.INTEGER,
      references: {
        model: EstadoEspacio,
        key: "id",
      },
      allowNull: true,
      field: "id_estado",
    },
    tipoEspacioId: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoEspacio,
        key: "id",
      },
      allowNull: true,
      field: "id_tipo_espacio",
    },
  },
  {
    sequelize: db2,
    modelName: "Espacio",
    tableName: "espacio",
    timestamps: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    version: false,
  }
);

Espacio.belongsTo(EstadoEspacio, {
  foreignKey: "estadoId",
  as: "estado",
});

Espacio.belongsTo(TipoEspacio, {
  foreignKey: "tipoEspacioId",
  as: "tipoEspacio",
});

export default Espacio;
