const prisma = require("../../prisma/prismaClient");

const criarUsuario = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;
  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        data_nascimento: new Date(data_nascimento),
      },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário." });
  }
};

module.exports = { criarUsuario };