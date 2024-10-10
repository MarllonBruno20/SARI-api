const jwtConfig = require("../../configs/jwt/jwtConfig.js");
const { redisClient } = require("../../configs/redis/redis.js");

const autenticarToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const user = jwtConfig.verifyToken(token);

    const usuarioDados = await redisClient.get(`user-${user.id.id}`);

    if (!usuarioDados) {
      return res.status(401).json({ error: "Token expirado ou inválido." });
    }

    const usuario = JSON.parse(usuarioDados);

    if (usuario.token !== token) {
      return res.status(401).json({ error: "Token expirado ou inválido." });
    }

    req.user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token expirado ou inválido." });
  }
};

module.exports = { autenticarToken };
