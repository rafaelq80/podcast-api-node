# Podcast Node API

API simples de podcasts usando Node.js puro e SQLite, sem frameworks.

## Funcionalidades
- Listar todos os episódios de podcasts
- Filtrar episódios por nome do podcast
- Cadastrar novo podcast com categorias
- Atualizar podcast existente
- Deletar podcast
- Estrutura relacional: podcasts, categorias e associação muitos-para-muitos

## Estrutura do Projeto
```
├── src/
│   ├── app.ts                # Roteamento principal
│   ├── server.ts             # Inicialização do servidor
│   ├── controllers/          # Controllers HTTP
│   ├── services/             # Lógica de negócio
│   ├── repositories/         # Acesso ao banco e migração
│   ├── models/               # Modelos de dados
│   ├── routes/               # Enum de rotas
│   └── utils/                # Utilitários (conexão SQLite)
├── podcasts.sqlite           # Banco de dados SQLite
├── package.json
├── tsconfig.json
└── readme.md
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` (opcional) para definir a porta:
   ```env
   PORT=3000
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor será iniciado na porta definida ou na 3000 por padrão.

## Rotas da API

### Listar todos os episódios
- **GET** `/api/list`

### Filtrar episódios por nome do podcast
- **GET** `/api/podcasts?p=nome_do_podcast`

### Cadastrar novo podcast
- **POST** `/api/podcasts`
- **Body:**
```json
{
  "podcastName": "flow",
  "episode": "Novo Episódio",
  "videoId": "abc123",
  "categories": ["categoria1", "categoria2"]
}
```
- **Resposta:**
```json
[
  {
    "podcastName": "flow",
    "episode": "Novo Episódio",
    "videoId": "abc123",
    "categories": ["categoria1", "categoria2"],
    "id": 5
  }
]
```

### Atualizar podcast
- **PUT** `/api/podcasts/{id}`
- **Body:** igual ao POST
- **Resposta:** igual ao POST

### Deletar podcast
- **DELETE** `/api/podcasts/{id}`
- **Resposta:** status 204 (sem conteúdo) ou 404 se não encontrado

## Observações
- O banco é migrado automaticamente a partir do arquivo `podcasts.json` na primeira execução.
- As categorias são únicas e associadas via tabela de relação.
- O projeto não utiliza frameworks, apenas Node.js, SQLite e TypeScript.

---

Desenvolvido para fins didáticos. Sinta-se à vontade para adaptar e evoluir!
