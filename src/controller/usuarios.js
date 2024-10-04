const bcrypt = require("bcrypt");

const jwtConfig = require("../../configs/jwtConfig");

const prisma = require("../../prisma/prismaClient");

const criarUsuario = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;

  const senhaCriptograda = await bcrypt.hash(senha, 10);

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptograda,
        dataNascimento: new Date(data_nascimento),
      },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar usuário.", details: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwtConfig.generateToken({ id: usuario.id });

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao fazer login.", details: error.message });
  }
};

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Usamos essa quebra pq normalmente usamos "Baerer XXX"

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const user = jwtConfig.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Token inválido.", details: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwtConfig.blacklistToken(token);

    res.status(200).json({ message: "Logout realizado com sucesso." });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao realizar logout.", details: error.message });
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
  loginUsuario,
  autenticarToken,
  logout,
};
