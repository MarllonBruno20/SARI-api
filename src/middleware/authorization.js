const verificarPermissao = (permissoes) => {
  return async (req, res, next) => {
    const { tipoUsuario } = req.user;

    if (!tipoUsuario || !permissoes.includes(tipoUsuario)) {
      return res
        .status(403)
        .json({ error: "Acesso negado. Você não tem permissão." });
    }

    next();
  };
};

module.exports = { verificarPermissao };
