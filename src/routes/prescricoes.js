const express = require("express");

const {
  criarPrescricao,
  obterPrescricoes,
  obterPrescricoesAtivas,
  atualizarPrescricao,
  excluirPrescricao,
  obterPrescricoesPorUsuario,
} = require("../controller/prescricoes");

const router = express.Router();

router.post("/prescricoes/criar", criarPrescricao);

router.get("/prescricoes", obterPrescricoes);

router.get("/prescricoes/ativas", obterPrescricoesAtivas);

router.get("/prescricoes/:id", obterPrescricoesPorUsuario);

router.put("/prescricoes/:id", atualizarPrescricao);

router.delete("/prescricoes/:id", excluirPrescricao);

module.exports = router;
