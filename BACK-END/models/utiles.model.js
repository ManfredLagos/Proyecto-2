const mongoose = require("mongoose");

const schemaUtiles = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    descripcion: {
        type:String,
        required: true,
        unique: false
    },
    cantidad: {
        type: Number,
        required: true,
        unique: true
    },
    grado: {
        type: String,
        required: true,
        unique: true
    },
    lista: {
        type: String,
        required: true,
        unique: false
    },
});

const Utiles = mongoose.model("Utiles", schemaUtiles);
module.exports = Utiles;