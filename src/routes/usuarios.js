const express = require("express");

const {
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
  obterUsuariosAtivos,
  obterUsuarios,
} = require("../controller/usuarios");

const router = express.Router();

router.post("/usuarios/criarUsuario", criarUsuario);

router.put("/usuarios/:id", atualizarUsuario);

router.delete("/usuarios/:id", excluirUsuario);

router.get("/usuarios/ativos", obterUsuariosAtivos);

router.get("/usuarios", obterUsuarios);

module.exports = router;
