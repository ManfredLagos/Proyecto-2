const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario.model");
const Certificacion = require("../models/certificacion.model");

// Ruta POST

router.post("/", async(req, res) => {
    const{correo, nombre, cedula, contrasenia} = req.body;
    if (!correo || !nombre || !cedula || !contrasenia){
        return res.status(400).json({msj: "Todos los campos son obligatorios"});
    }
    try{
        const nuevoUsuario = new Usuario({correo, nombre, cedula, contrasenia});
        await nuevoUsuario.save()
        res.status(201).json(nuevoUsuario);
    } catch(error){
        res.status(400).json({msj: error.message});
    }
});

module.exports = router;

// GET: Solicitar datos al servidor (listar usuarios)
router.get("/", async(req, res) => {
    try {
        const usuarios = await Usuario.find().populate("certificaciones");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({msj: error.message});
    }
});

module.exports = router;

// PUT: Actualizar datos al servidor
router.put("/agregar-certificacion", async(req, res) => {
    const {cedula, certificacionId} = req.body;
    console.log(cedula, certificacionId);
    if (!cedula || !certificacionId){
        return res.status(400).json({msj: "Cédula y el Id de la certificación son obligatorios"});
    }
    try {
        const certificacion = await Certificacion.findById(certificacionId);
        if(!certificacion){
            return res.status(404).json({msj: "Certificación no existe"});
        }

        const usuario = await Usuario.findOne({cedula});
        if (!usuario){
            return res.status(404).json({msj: "Usuario no encontrado"});
        }
        if (!usuario.certificaciones.includes(certificacionId)){
            usuario.certificaciones.push(certificacionId);
            await usuario.save();
        }
        res.status(200).json({msj: "Certificación agregada al usuario", usuario});

    } catch (error) {
        res.status(500).json({msj: "Error al agregar la certificación", error: error.message || error.toString()});
    }
});

module.exports = router;