// Controller responsável por lidar com as requisições HTTP relacionadas a podcasts
// Recebe as requisições, chama os serviços e retorna as respostas para o cliente

import { IncomingMessage, ServerResponse } from "http";

import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceCreatePodcast, serviceUpdatePodcast, serviceDeletePodcast } from "../services/podcast-crud-service";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

const defaultContent = { "Content-Type": "application/json" };

// Lista todos os episódios de podcasts
export const getListEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTransferModel = await serviceListEpisodes();
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));
  res.end();
};

// Filtra episódios de podcasts por nome
export const getFilterEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTransferModel = await serviceFilterEpisodes(req.url);
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));
  res.end();
};

// Cadastra um novo podcast (espera um JSON no body)
export const createPodcast = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";
  req.on("data", chunk => { body += chunk; });
  req.on("end", async () => {
    const podcast = JSON.parse(body); // Espera PodcastModel
    const content: PodcastTransferModel = await serviceCreatePodcast(podcast);
    res.writeHead(content.statusCode, defaultContent);
    res.write(JSON.stringify(content.body)); // Envia o JSON do podcast criado
    res.end();
  });
};

// Atualiza um podcast existente (espera um JSON no body e o id na URL)
export const updatePodcast = async (req: IncomingMessage, res: ServerResponse, id: number) => {
  let body = "";
  req.on("data", chunk => { body += chunk; });
  req.on("end", async () => {
    const podcast = JSON.parse(body); // Espera PodcastModel
    const content: PodcastTransferModel = await serviceUpdatePodcast(id, podcast);
    res.writeHead(content.statusCode, defaultContent);
    res.write(JSON.stringify(content.body)); // Envia o JSON do podcast atualizado
    res.end();
  });
};

// Deleta um podcast pelo id
export const deletePodcast = async (req: IncomingMessage, res: ServerResponse, id: number) => {
  const content: PodcastTransferModel = await serviceDeletePodcast(id);
  res.writeHead(content.statusCode, defaultContent);
  res.end();
};
