// Repositório responsável por acessar e manipular os dados de podcasts no banco SQLite
// Inclui funções para migração, cadastro, atualização, deleção e utilitários auxiliares

const { db } = require('../utils/db');
const fs = require('fs');
const path = require('path');
import { PodcastModel } from '../models/podcast-model';

const jsonPath = path.resolve(__dirname, 'podcasts.json');

// Utilitário para executar comandos SQL de escrita (INSERT, UPDATE, DELETE) usando async/await
function dbRunAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: any, err: Error | null) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Utilitário para executar comandos SQL de leitura (SELECT) usando async/await
function dbGetAsync(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Migra os dados do arquivo JSON para o banco SQLite, evitando duplicidade
// Só insere podcasts que ainda não existem no banco
async function migrateJsonToSqlite() {
  if (!fs.existsSync(jsonPath)) return;
  const podcasts: PodcastModel[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  for (const podcast of podcasts) {
    // Verifica se o podcast já existe no banco
    const exists = await dbGetAsync(
      `SELECT id FROM podcasts WHERE podcastName = ? AND episode = ? AND videoId = ?`,
      [podcast.podcastName, podcast.episode, podcast.videoId]
    );
    if (exists) continue;

    // Insere o podcast
    const result = await dbRunAsync(
      `INSERT INTO podcasts (podcastName, episode, videoId) VALUES (?, ?, ?)`,
      [podcast.podcastName, podcast.episode, podcast.videoId]
    );
    const podcastId = result.lastID;

    // Associa as categorias ao podcast
    for (const cat of podcast.categories) {
      const categoryId = await getOrCreateCategoryId(cat);
      await associatePodcastCategory(podcastId, categoryId);
    }
  }
}

// Busca o id de uma categoria pelo nome, criando se não existir
async function getOrCreateCategoryId(cat: string): Promise<number> {
  const row = await dbGetAsync(
    `SELECT id FROM categories WHERE name = ?`,
    [cat]
  );
  if (row) return row.id;
  const result = await dbRunAsync(
    `INSERT INTO categories (name) VALUES (?)`,
    [cat]
  );
  return result.lastID;
}

// Cria a relação entre um podcast e uma categoria
async function associatePodcastCategory(podcastId: number, categoryId: number): Promise<void> {
  await dbRunAsync(
    `INSERT OR IGNORE INTO podcast_categories (podcast_id, category_id) VALUES (?, ?)`,
    [podcastId, categoryId]
  );
}

// Lista todos os podcasts ou filtra por nome, retornando as categorias associadas
async function repositoryPodcast(podcastName?: string): Promise<PodcastModel[]> {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT p.id, p.podcastName, p.episode, p.videoId, c.name as category
      FROM podcasts p
      LEFT JOIN podcast_categories pc ON p.id = pc.podcast_id
      LEFT JOIN categories c ON pc.category_id = c.id
    `;
    let params: any[] = [];
    if (podcastName) {
      query += ' WHERE p.podcastName = ?';
      params.push(podcastName);
    }
    db.all(query, params, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        // Agrupa as categorias de cada podcast em um array
        const podcastsMap: { [key: string]: PodcastModel } = {};
        rows.forEach(row => {
          const key = row.id;
          if (!podcastsMap[key]) {
            podcastsMap[key] = {
              id: row.id,
              podcastName: row.podcastName,
              episode: row.episode,
              videoId: row.videoId,
              categories: []
            };
          }
          if (row.category) {
            podcastsMap[key].categories.push(row.category);
          }
        });
        resolve(Object.values(podcastsMap));
      }
    });
  });
}

// Cadastra um novo podcast e associa as categorias
async function createPodcast(podcast: PodcastModel): Promise<number> {
  const result = await dbRunAsync(
    `INSERT INTO podcasts (podcastName, episode, videoId) VALUES (?, ?, ?)`,
    [podcast.podcastName, podcast.episode, podcast.videoId]
  );
  const podcastId = result.lastID;
  for (const cat of podcast.categories) {
    const categoryId = await getOrCreateCategoryId(cat);
    await associatePodcastCategory(podcastId, categoryId);
  }
  return podcastId;
}

// Atualiza os dados e categorias de um podcast existente
async function updatePodcastCategories(id: number, categories: string[]): Promise<void> {
  // Remove todas as associações antigas
  await dbRunAsync(
    `DELETE FROM podcast_categories WHERE podcast_id = ?`,
    [id]
  );
  // Reinsere as associações com as novas categorias
  for (const cat of categories) {
    const categoryId = await getOrCreateCategoryId(cat);
    await associatePodcastCategory(id, categoryId);
  }
}

// Atualiza os dados do podcast e suas categorias
async function updatePodcast(id: number, podcast: PodcastModel): Promise<void> {
  await dbRunAsync(
    `UPDATE podcasts SET podcastName = ?, episode = ?, videoId = ? WHERE id = ?`,
    [podcast.podcastName, podcast.episode, podcast.videoId, id]
  );
  await updatePodcastCategories(id, podcast.categories);
}

// Deleta um podcast e suas associações
async function deletePodcast(id: number): Promise<void> {
  // Verifica se o podcast existe
  const exists = await dbGetAsync(
    `SELECT id FROM podcasts WHERE id = ?`,
    [id]
  );
  if (!exists) {
    throw new Error('Podcast não encontrado');
  }
  await dbRunAsync(
    `DELETE FROM podcasts WHERE id = ?`,
    [id]
  );
}

// Exporta as funções do repositório
module.exports = {
  migrateJsonToSqlite,
  repositoryPodcast,
  createPodcast,
  updatePodcast,
  deletePodcast,
};
