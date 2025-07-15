// Arquivo de definição das rotas da API de podcasts
// Define caminhos fixos para facilitar o roteamento na aplicação

export enum Routes {
  LIST = "/api/list",
  ESPISODE = "/api/podcasts",
  CREATE = "/api/podcasts", // POST
  UPDATE = "/api/podcasts/", // PUT + id
  DELETE = "/api/podcasts/", // DELETE + id
}
