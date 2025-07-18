const express = require("express");
const router = express.Router();
const Certificacion = require("../models/certificacion.model");

// Ruta POST producto

router.post("/", async(req, res) => {
    try{
        const nuevaCertificacion = new Certificacion(req.body);
        const certificacionGuardada = await nuevaCertificacion.save();
        res.status(201).json(certificacionGuardada);
    } catch(error){
        res.status(400).json({msj: "Error al crear certificación", error});
    }
});

// GET: Solicitar datos al servidor (listar productos)
router.get("/", async(req, res) => {
    try {
        const certificaciones = await Certificacion.find();
        res.json(certificaciones);
    } catch (error) {
        res.status(500).json({msj: "Error al crear certificación", error});
    }
});

module.exports = router;