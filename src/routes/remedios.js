const express = require("express");

const {
  criarRemedio,
  atualizarRemedio,
  excluirRemedio,
  obterRemedios,
  obterRemediosAtivos,
} = require("../controller/remedios");

const router = express.Router();

router.post("/remedios", criarRemedio);

router.put("/remedios/:id", atualizarRemedio);

router.delete("/remedios/:id", excluirRemedio);

router.get("/remedios", obterRemedios);

router.get("/remedios/ativos", obterRemediosAtivos);

module.exports = router;
