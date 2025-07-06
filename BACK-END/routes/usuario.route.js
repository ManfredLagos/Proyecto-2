const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario.model");

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
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({msj: error.message});
    }
});

module.exports = router;

// GET: Solicitar datos al servidor (listar usuarios)
router.get("/", async(req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({msj: error.message});
    }
});

module.exports = router;







