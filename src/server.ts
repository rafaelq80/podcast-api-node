// Arquivo de inicialização do servidor HTTP
// Responsável por carregar variáveis de ambiente, inicializar o banco e subir o servidor

require('dotenv').config();
import * as http from "http";
import { app } from "./app";
const { db, initDb } = require('./utils/db');
const podcastsRepository = require('./repositories/podcasts-repository');

const port = process.env.PORT || 3000;

// Inicializa o banco de dados e faz a migração dos dados do JSON
initDb().then(() => {
  podcastsRepository.migrateJsonToSqlite(); // Migra dados do JSON para o banco, se necessário
  // Cria e inicia o servidor HTTP
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`servidor iniciado na porta ${port}`);
  });
}).catch((err: any) => {
  console.error('Erro ao inicializar o banco:', err);
});
