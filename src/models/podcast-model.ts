// Modelo de dados para um podcast
// Representa um episódio de podcast e suas categorias associadas

export interface PodcastModel {
  id?: number; // ID do podcast (opcional, gerado pelo banco)
  podcastName: string; // Nome do podcast
  episode: string; // Nome ou título do episódio
  videoId: string; // ID do vídeo (ex: YouTube)
  categories: string[]; // Lista de categorias associadas ao episódio
}
