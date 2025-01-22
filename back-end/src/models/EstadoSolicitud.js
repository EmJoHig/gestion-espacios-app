import { DataTypes, Model } from "sequelize";
import db2 from "../database/db2.js";

class EstadoSolicitud extends Model { }

EstadoSolicitud.init({
    // id? En Sequelize, el atributo id es tratado automáticamente si no se define explicitamente.
    codigo: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
},
    {
        sequelize: db2,
        modelName: "EstadoSolicitud",
        tableName: "estado_solicitud",
        timestamps: false, // Por defecto, Sequelize añade automáticamente dos columnas en cada tabla que crea: createdAt y updatedAt. Estas columnas sirven para almacenar las fechas de creación y última actualización de un registro.
        //createdAt: "createdAt", // No hace falta si timetamps es false, esto es para personalizar el nombre de la columna
        //updatedAt: "updatedAt", // Idem.
        version: false, // Evita crear la columna version.
    }
);

export default EstadoSolicitud;
