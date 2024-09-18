const express = require("express");
const usuarioRoutes = require("./src/routes/usuarios");

const app = express();
app.use(express.json());

app.use(usuarioRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
