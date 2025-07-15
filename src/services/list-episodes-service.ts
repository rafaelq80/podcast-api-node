// Service responsável por listar todos os episódios de podcasts
// Utiliza o repositório para buscar os dados e retorna no formato padronizado

import { PodcastTransferModel } from "../models/podcast-transfer-model";
const { repositoryPodcast } = require("../repositories/podcasts-repository");

export const serviceListEpisodes = async (): Promise<PodcastTransferModel> => {
  let responseFormat: PodcastTransferModel = {
    statusCode: 0,
    body: [],
  };

  // Busca todos os podcasts no banco
  const data = await repositoryPodcast();

  // Monta o formato de resposta
  responseFormat = {
    statusCode: data.length !== 0 ? 200 : 204,
    body: data,
  };

  return responseFormat;
};
