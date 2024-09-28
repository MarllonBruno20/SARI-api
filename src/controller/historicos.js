const prisma = require("../../prisma/prismaClient");

const criarHistorico = async (req, res) => {
  const { prescricaoId, dataAtual } = req.body;
  try {
    const novoHistorico = await prisma.historico.create({
      data: {
        prescricaoId,
        dataAtual: new Date(dataAtual),
      },
    });
    res.status(201).json(novoHistorico);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar o histórico.", details: error.message });
  }
};

const atualizarHistorico = async (req, res) => {
  const { id } = req.params;
  const { prescricaoId, dataAtual } = req.body;
  try {
    const historicoAtualizado = await prisma.historico.update({
      where: { id: parseInt(id) },
      data: { prescricaoId, dataAtual: new Date(dataAtual) },
    });
    res.status(200).json(historicoAtualizado);
  } catch (error) {
    res.status(400).json({
      error: "Erro ao atualizar o historico.",
      details: error.message,
    });
  }
};

const obterHistoricos = async (req, res) => {
  try {
    const historicos = await prisma.historico.findMany();
    res.status(200).json(historicos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao obter históricos.", details: error.message });
  }
};

const excluirHistorico = async (req, res) => {
  const { id } = req.params;
  try {
    const historicoExcluido = await prisma.historico.update({
      where: { id: parseInt(id) },
      data: { status: "inativo" },
    });
    res.status(200).json({ message: "Historico excluído com sucesso." });
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir historico." });
  }
};

module.exports = {
  criarHistorico,
  atualizarHistorico,
  excluirHistorico,
  obterHistoricos,
};
