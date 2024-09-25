const express = require("express");
const usuarioRoutes = require("./src/routes/usuarios");
const remedioRoutes = require("./src/routes/remedios");
const prescricaoRoutes = require("./src/routes/prescricoes");
const historicoRoutes = require("./src/routes/historicos");

const app = express();
app.use(express.json());

app.use("/api", usuarioRoutes);

app.use("/api", remedioRoutes);

app.use("/api", prescricaoRoutes);

app.use("/api", historicoRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
