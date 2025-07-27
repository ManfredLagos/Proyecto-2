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
    grado: {
        type:Number,
        required: true,
        unique: false
    }
});

const Utiles = mongoose.model("Utiles", schemaUtiles);
module.exports = Utiles;