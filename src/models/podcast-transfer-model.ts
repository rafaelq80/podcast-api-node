// Modelo de resposta para transferir dados de podcast na API
// Utilizado para padronizar o retorno dos serviços e controllers

import { PodcastModel } from "./podcast-model";

export interface PodcastTransferModel {
  statusCode: number; // Código HTTP da resposta
  body: PodcastModel[]; // Lista de podcasts retornados na resposta
}
