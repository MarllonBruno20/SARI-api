const bcrypt = require("bcrypt");

const jwtConfig = require("../../configs/jwt/jwtConfig.js");

const prisma = require("../../prisma/prismaClient");
const { redisClient } = require("../../configs/redis/redis.js");

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, data_nascimento } = req.body;

    const senhaCriptograda = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptograda,
        dataNascimento: new Date(data_nascimento),
        tipoUsuario: "comum",
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

    const token = jwtConfig.generateToken({
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
    });

    const usuarioDados = {
      id: usuario.id,
      tipoUsuario: usuario.tipoUsuario,
      token: token,
    };

    await redisClient.set(`user-${usuario.id}`, JSON.stringify(usuarioDados));

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao fazer login.", details: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const user = jwtConfig.verifyToken(token);
    await redisClient.del(`user-${user.id.id}`);

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

const obterInformacoesUsuario = async (req, res) => {
  const { nome, email } = req.user; // Acessa o id, nome e email do usuário

  return res.json({ nome, email });
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
  logout,
  obterInformacoesUsuario,
};
