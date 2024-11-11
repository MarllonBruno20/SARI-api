const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./configs/swagger/swagger.json");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const usuarioRoutes = require("./src/routes/usuarios");
const remedioRoutes = require("./src/routes/remedios");
const prescricaoRoutes = require("./src/routes/prescricoes");
const historicoRoutes = require("./src/routes/historicos");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", usuarioRoutes);

app.use("/api", remedioRoutes);

app.use("/api", prescricaoRoutes);

app.use("/api", historicoRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
