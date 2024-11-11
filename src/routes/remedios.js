const express = require("express");

const { autenticarToken } = require("../middleware/authentication");

const { verificarPermissao } = require("../middleware/authorization");

const {
  criarRemedio,
  atualizarRemedio,
  excluirRemedio,
  obterRemedios,
  obterRemediosAtivos,
} = require("../controller/remedios");

const router = express.Router();

router.post("/remedios/criar", autenticarToken, criarRemedio);

router.put("/remedios/:id", autenticarToken, atualizarRemedio);

router.delete("/remedios/:id", autenticarToken, excluirRemedio);

router.get("/remedios", autenticarToken, obterRemedios);

router.get("/remedios/ativos", autenticarToken, obterRemediosAtivos);

module.exports = router;
