const jwtConfig = require("../../configs/jwt/jwtConfig.js");
const { redisClient } = require("../../configs/redis/redis.js");
const prisma = require("../../prisma/prismaClient.js");

const autenticarToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const user = jwtConfig.verifyToken(token);
    const userId = user.id.id;

    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });

    const { nome, email } = usuario;

    req.user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token expirado ou inválido." });
  }
};

module.exports = { autenticarToken };
