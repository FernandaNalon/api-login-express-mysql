// em seguida, temos a configuração do banco de dados e quem cria a coneção com o nosso banco

// Importa o mysql2
const mysql = require("mysql2/promise");

// Carrega as variáveis do .env
require("dotenv").config();

// Cria a conexão com o banco
// create.Pool é um gerenciador de conexões com o banco.
const conexao = mysql.createPool({
// Estamos pegando os dados do arquivo .env.
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Exporta a conexão
module.exports = conexao;