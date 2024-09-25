const express = require("express");

const {
  criarHistorico,
  atualizarHistorico,
  excluirHistorico,
  obterHistoricos,
} = require("../controller/historicos");

const router = express.Router();

router.post("/historicos", criarHistorico);

router.put("/historicos/:id", atualizarHistorico);

router.delete("/historicos/:id", excluirHistorico);

router.get("/historicos", obterHistoricos);

module.exports = router;
