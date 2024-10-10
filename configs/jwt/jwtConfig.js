const jwt = require("jsonwebtoken");

const blacklist = [];

const generateToken = (id, tipoUsuario) => {
  return jwt.sign({ id, tipoUsuario }, process.env.SECRET_JWT, {
    expiresIn: "1h",
  });
};

const blacklistToken = (token) => {
  blacklist.push(token);
};

const verifyToken = (token) => {
  if (blacklist.includes(token)) {
    throw new Error("Token inválido.");
  }

  return jwt.verify(token, process.env.SECRET_JWT);
};

module.exports = { generateToken, verifyToken, blacklistToken };
