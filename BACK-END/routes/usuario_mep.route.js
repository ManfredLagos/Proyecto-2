const express = require("express");
const mongoose = require("mongoose"); // IMPORTAR mongoose para validación ObjectId
const router = express.Router();
const Usuario_mep = require("../models/usuario_mep.model");

// Ruta POST: Crear usuario
router.post("/", async (req, res) => {
  const { nombre, apellidos, correo, usuario, contrasenia, rol } = req.body;
  if (!nombre || !apellidos || !correo || !usuario || !contrasenia || !rol) {
    return res.status(400).json({ msj: "Todos los campos son obligatorios" });
  }
  try {
    const nuevoUsuario_mep = new Usuario_mep({
      nombre,
      apellidos,
      correo,
      usuario,
      contrasenia,
      rol,
    });
    await nuevoUsuario_mep.save();
    return res.status(201).json(nuevoUsuario_mep);
  } catch (error) {
    return res.status(400).json({ msj: error.message });
  }
});

// Ruta GET: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios_mep = await Usuario_mep.find();
    return res.json(usuarios_mep);
  } catch (error) {
    return res.status(500).json({ msj: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msj: "ID inválido" });
  }
  try {
    const usuario = await Usuario_mep.findById(id);
    if (!usuario) {
      return res.status(404).json({ msj: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ msj: error.message });
  }
});

module.exports = router;

