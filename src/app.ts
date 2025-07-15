// Arquivo principal de roteamento da aplicação
// Recebe as requisições HTTP e direciona para o controller correto

import * as http from "http";

import {
  getListEpisodes,
  getFilterEpisodes,
  createPodcast,
  updatePodcast,
  deletePodcast,
} from "./controllers/podscasts-controller";

import { Routes } from "./routes/routes";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  // Extrai a URL base (sem query params)
  const baseUrl = request.url?.split("?")[0];

  // Rota para listar todos os episódios
  if (request.method === "GET" && baseUrl === Routes.LIST) {
    await getListEpisodes(request, response);
  }

  // Rota para filtrar/listar episódios por nome
  if (request.method === "GET" && baseUrl === Routes.ESPISODE) {
    await getFilterEpisodes(request, response);
  }

  // Rota para cadastrar um novo podcast
  if (request.method === "POST" && baseUrl === Routes.ESPISODE) {
    await createPodcast(request, response);
  }

  // Rota para atualizar um podcast existente (PUT /api/podcasts/{id})
  if (request.method === "PUT" && baseUrl?.startsWith(Routes.ESPISODE + "/")) {
    const id = parseInt(baseUrl.replace(Routes.ESPISODE + "/", ""));
    await updatePodcast(request, response, id);
  }

  // Rota para deletar um podcast (DELETE /api/podcasts/{id})
  if (request.method === "DELETE" && baseUrl?.startsWith(Routes.ESPISODE + "/")) {
    const id = parseInt(baseUrl.replace(Routes.ESPISODE + "/", ""));
    await deletePodcast(request, response, id);
  }
};
