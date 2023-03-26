const dotEnv = require("dotenv");
const app = require("./app");

dotEnv.config();
const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
