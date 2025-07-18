const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaUsuario = new mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    cedula: {
        type:String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true,
        unique: false
    },
    certificaciones: [
        {
            type: Schema.Types.ObjectId,
            ref:"Certificacion"
        }
    ]
});

const Usuario = mongoose.model("Usuario", schemaUsuario);
module.exports = Usuario;