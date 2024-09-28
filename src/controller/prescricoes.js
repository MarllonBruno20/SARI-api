const prisma = require("../../prisma/prismaClient");

const criarPrescricao = async (req, res) => {
  const {
    usuario_id,
    remedio_id,
    observacao,
    frequencia,
    dataInicio,
    dataFim,
  } = req.body;

  if (!usuario_id || !remedio_id || !frequencia || !dataInicio || !dataFim) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const novaPrescricao = await prisma.prescricao.create({
      data: {
        usuarioId: parseInt(usuario_id),
        remedioId: parseInt(remedio_id),
        observacao,
        frequencia,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
      },
    });
    res.status(201).json(novaPrescricao);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar prescrição.", details: error.message });
  }
};

const atualizarPrescricao = async (req, res) => {
  const { id } = req.params;
  const { remedio_id, observacao, frequencia, dataInicio, dataFim } = req.body;
  try {
    const prescricaoAtualizada = await prisma.prescricao.update({
      where: { id: parseInt(id) },
      data: {
        remedio_id,
        observacao,
        frequencia,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
      },
    });
    res.status(200).json(prescricaoAtualizada);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar prescrição." });
  }
};

const excluirPrescricao = async (req, res) => {
  const { id } = req.params;
  try {
    const prescricaoExcluida = await prisma.prescricao.update({
      where: { id: parseInt(id) },
      data: { status: "inativo" },
    });
    res.status(200).json({ message: "Prescrição excluída com sucesso." });
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir prescrição." });
  }
};

const obterPrescricoes = async (req, res) => {
  try {
    const prescricoes = await prisma.prescricao.findMany();
    res.status(200).json(prescricoes);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar prescrições." });
  }
};

const obterPrescricoesAtivas = async (req, res) => {
  try {
    const prescricoesAtivas = await prisma.prescricao.findMany({
      where: { status: "ativo" },
    });
    res.status(200).json(prescricoesAtivas);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar prescrições." });
  }
};

const obterPrescricoesPorUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const prescricoes = await prisma.prescricao.findMany({
      where: { usuarioId: parseInt(id) },
    });
    res.status(200).json(prescricoes);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar prescrições." });
  }
};

module.exports = {
  criarPrescricao,
  atualizarPrescricao,
  excluirPrescricao,
  obterPrescricoes,
  obterPrescricoesAtivas,
  obterPrescricoesPorUsuario,
};
