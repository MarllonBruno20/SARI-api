const express = require("express");
const { criarUsuario } = require("../controller/usuarios");

const router = express.Router();

router.post("/usuarios", criarUsuario);

module.exports = router;
