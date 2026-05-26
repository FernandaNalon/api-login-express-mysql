// Importa a biblioteca Express
const express = require("express");

// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require("path");

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa as funções do controller de autenticação
const {
  cadastrarUsuario,
  realizarLogin,
  exibirSucesso,
} = require("./controllers/authController");

// Cria a aplicação Express
const app = express();

// Importa a conexão com o banco
const conexao = require("./config/database");

// Testa a conexão com o banco
conexao.getConnection()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar no banco:", erro);
  });

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware para ler dados enviados por formulários HTML
app.use(express.urlencoded({ extended: true }));

// Middleware para ler dados em JSON
app.use(express.json());

// Middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota inicial: redireciona para a tela de login
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// Rota que recebe os dados do formulário de cadastro
app.post("/cadastro", cadastrarUsuario);

// Rota que recebe os dados do formulário de login
app.post("/login", realizarLogin);

// Rota de sucesso após login
app.get("/sucesso", exibirSucesso);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});