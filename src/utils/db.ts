const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados SQLite
const dbPath = path.resolve(__dirname, '../../podcasts.sqlite');

// Cria e exporta a conexão
const db = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite em', dbPath);
  }
});

function initDb(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS podcasts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          podcastName TEXT NOT NULL,
          episode TEXT NOT NULL,
          videoId TEXT NOT NULL
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS podcast_categories (
          podcast_id INTEGER NOT NULL,
          category_id INTEGER NOT NULL,
          PRIMARY KEY (podcast_id, category_id),
          FOREIGN KEY (podcast_id) REFERENCES podcasts(id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
        )
      `, (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

module.exports = { db, initDb }; 