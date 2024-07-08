import { DataTypes } from "sequelize";
import db2 from "../database/db2.js";

const NoteSchema = db2.define('note', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    user:{type: DataTypes.STRING}
}, {timestamps: false})

export default NoteSchema
