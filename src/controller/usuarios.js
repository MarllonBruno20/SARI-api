const prisma = require("../../prisma/prismaClient");

const criarUsuario = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;

  if (!nome || !email || !senha || !data_nascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        dataNascimento: new Date(data_nascimento),
      },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email já cadastrado." });
    } else {
      res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, data_nascimento } = req.body;
  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
        senha,
        dataNascimento: data_nascimento ? new Date(data_nascimento) : undefined,
      },
    });
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário." });
  }
};

const excluirUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioExcluido = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { status: "inativo" },
    });
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir usuário." });
  }
};

const obterUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar usuários." });
  }
};

const obterUsuariosAtivos = async (req, res) => {
  try {
    const usuariosAtivos = await prisma.usuario.findMany({
      where: { status: "ativo" },
    });
    res.status(200).json(usuariosAtivos);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar usuários." });
  }
};

module.exports = {
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
  obterUsuariosAtivos,
  obterUsuarios,
};
