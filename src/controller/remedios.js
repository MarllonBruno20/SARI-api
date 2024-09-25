const prisma = require("../../prisma/prismaClient");

const criarRemedio = async (req, res) => {
  const { nome, funcao, dosagem } = req.body;

  if (!nome || !funcao || !dosagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const novoRemedio = await prisma.remedio.create({
      data: {
        nome,
        funcao,
        dosagem,
      },
    });
    res.status(201).json(novoRemedio);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar remédio." });
  }
};

const atualizarRemedio = async (req, res) => {
  const { id } = req.params;
  const { nome, funcao, dosagem } = req.body;

  try {
    const remedioAtualizado = await prisma.remedio.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        funcao,
        dosagem,
      },
    });
    res.status(200).json(remedioAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar remédio." });
  }
};

const obterRemedios = async (req, res) => {
  try {
    const remedios = await prisma.remedio.findMany();
    res.status(200).json(remedios);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar remédios." });
  }
};

const obterRemediosAtivos = async (req, res) => {
  try {
    const remediosAtivos = await prisma.remedio.findMany({
      where: { status: "ativo" },
    });
    res.status(200).json(remediosAtivos);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar remédios." });
  }
};

const excluirRemedio = async (req, res) => {
  const { id } = req.params;
  try {
    const remedioExcluido = await prisma.remedio.update({
      where: { id: parseInt(id) },
      data: { status: "inativo" },
    });
    res.status(200).json({ message: "Remédio excluído com sucesso." });
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir remédio." });
  }
};

module.exports = {
  criarRemedio,
  atualizarRemedio,
  excluirRemedio,
  obterRemedios,
  obterRemediosAtivos,
};
