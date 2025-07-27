const express = require("express");
const router = express.Router();
const Usuario = require("../models/utiles.model");

// Ruta POST

router.post("/", async(req, res) => {
    const{nombre, descripcion, cantidad} = req.body;
    if (!nombre || !descripcion || !cantidad){
        return res.status(400).json({msj: "Todos los campos son obligatorios"});
    }
    try{
        const nuevoUtil = new Util({nombre, descipcion, cantidad});
        await nuevoutil.save()
        res.status(201).json(nuevoutil);
    } catch(error){
        res.status(400).json({msj: error.message});
    }
});

// GET: Solicitar datos al servidor (listar usuarios)
router.get("/", async(req, res) => {
    try {
        const utiles = await Util.find();
        res.json(utiles);
    } catch (error) {
        res.status(500).json({msj: error.message});
    }
});

module.exports = router;