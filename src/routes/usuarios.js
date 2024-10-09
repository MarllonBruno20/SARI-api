const express = require("express");

const {
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
  obterUsuariosAtivos,
  obterUsuarios,
  loginUsuario,
  autenticarToken,
  logout,
  obterInformacoesUsuario,
} = require("../controller/usuarios");

const router = express.Router();

router.post("/usuarios/criarUsuario", criarUsuario);

router.post("/login", loginUsuario);

router.post("/logout", autenticarToken, logout);

router.put("/usuarios/:id", autenticarToken, atualizarUsuario);

router.delete("/usuarios/:id", autenticarToken, excluirUsuario);

router.get("/usuarios/ativos", autenticarToken, obterUsuariosAtivos);

router.get("/usuarios", autenticarToken, obterUsuarios);

router.get("/usuarios/:id", autenticarToken, obterInformacoesUsuario);

module.exports = router;
