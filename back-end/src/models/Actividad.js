import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js";
import Ministerio from "./Ministerio.js";

class Actividad extends Model {}

Actividad.init(
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
    //ministerioId se refiere a la clave foránea dentro del modelo de datos y no el la BD.
    ministerioId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ministerio,
        key: "id",
      },
      allowNull: true,
      field: "id_ministerio", // Acá defino el nombre real de la columna en la BD.
    },
    fechaBaja: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db2,
    modelName: "Actividad",
    tableName: "actividad",
    timestamps: false, // Por defecto, Sequelize añade automáticamente dos columnas en cada tabla que crea: createdAt y updatedAt. Estas columnas sirven para almacenar las fechas de creación y última actualización de un registro.
    //createdAt: "createdAt", // No hace falta si timetamps es false, esto es para personalizar el nombre de la columna
    //updatedAt: "updatedAt", // Idem.
    version: false, // Evita crear la columna version.
  }
);

// Ahora establezco la relación entre los modelos: Actividad y Ministerio.
Actividad.belongsTo(Ministerio, {
  foreignKey: "ministerioId",
  as: "ministerio", // Establece un alias para acceder a la relación de manera más clara cuando hagas las consultas.
  /*Ejemplo:

  const actividadesConMinisterio = await Actividad.findAll({
  include: [{
    model: Ministerio,  // Incluye el modelo Ministerio
    as: 'ministerio',  // Usa el alias para acceder a la relación
  }]
});

Me devuelve:

{
    "id": 1,
    "nombre": "Actividad 1",
    "descripcion": "Descripción de la actividad 1",
    "ministerio": {
      "id": 2,
      "nombre": "Ministerio X",
      "descripcion": "Descripción del ministerio X"
    }
  },
*/
});

export default Actividad;
