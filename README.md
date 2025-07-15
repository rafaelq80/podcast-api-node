<h1>Desafio de projeto - Podcast Node API</h1>

<br />

<div align="center">
	<img src="https://i.imgur.com/r9lrbPG.png" title="source: imgur.com" width="35%"/>
</div>
<br />

<div align="center">
  <img src="https://img.shields.io/github/languages/top/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/github/repo-size/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/github/languages/count/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/github/issues/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/github/issues-pr/rafaelq80/podcast-api-node?style=flat-square" />
  <img src="https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen" alt="Status: Concluído">

</div>

<br />

API REST simples e funcional para gerenciamento de episódios de podcasts, desenvolvida com **Node.js puro**, **TypeScript** e **SQLite 3**, sem uso de frameworks externos.

<br />

## 🎙️ Funcionalidades

- 🔎 Listar todos os episódios de podcasts
- 🎧 Filtrar episódios por nome do podcast
- ➕ Cadastrar novo episódio com categorias
- ✏️ Atualizar um episódio existente
- ❌ Deletar um episódio
- 🔗 Relacionamento muitos-para-muitos entre **podcasts** e **categorias**

<br />

## 📁Estrutura do Projeto

```bash
├── src/
│   ├── app.ts              # Roteamento principal
│   ├── server.ts           # Inicialização do servidor
│   ├── controllers/        # Lógica de controle das requisições
│   ├── services/           # Regras de negócio
│   ├── repositories/       # Acesso ao banco e migração
│   ├── models/             # Estrutura dos dados
│   ├── routes/             # Enumeração das rotas
│   └── utils/              # Funções auxiliares (ex: conexão SQLite)
├── podcasts.sqlite         # Banco de dados local (SQLite)
├── package.json
├── tsconfig.json
└── README.md
```

<br />

## ▶ Como Executar o Projeto

### 1. Clone o projeto

```bash
git clone https://github.com/rafaelq80/podcast-api-node
```

### 2. Instale as dependências

```bash
npm install
```

### 3. (Opcional) Configure a porta no `.env`

Crie um arquivo `.env` com a variável de ambiente:

```env
PORT=3000
```

> Caso não informe a porta, o servidor usará a porta **3000** como padrão.

### 4. Inicie a API

```bash
npm start
```

> O banco de dados será gerado e populado automaticamente a partir do arquivo `podcasts.json` na primeira execução.

<br />

## 🔗 Endpoints da API

### 📋 Listar todos os episódios

- **GET** `/api/list`

### 🔍 Filtrar por nome do podcast

- **GET** `/api/podcasts?p=nome_do_podcast`

### 🆕 Criar novo episódio

- **POST** `/api/podcasts`

#### Exemplo de body:

```json
{
  "podcastName": "flow",
  "episode": "Novo Episódio",
  "videoId": "abc123",
  "categories": ["entrevista", "humor"]
}
```

#### Resposta:

```json
[
  {
    "podcastName": "flow",
    "episode": "Novo Episódio",
    "videoId": "abc123",
    "categories": ["entrevista", "humor"],
    "id": 5
  }
]
```

### 📝 Atualizar episódio existente

- **PUT** `/api/podcasts/{id}`

#### Body: igual ao POST

#### Resposta: igual ao POST

### 🗑 Deletar episódio

- **DELETE** `/api/podcasts/{id}`

#### Resposta:

- **204 No Content** – sucesso
- **404 Not Found** – se não existir

<br />

## 🧠 Observações Técnicas

- A estrutura de dados segue o modelo relacional com:
  - Tabela de **podcasts**
  - Tabela de **categorias** (únicas)
  - Tabela intermediária de **relacionamento** (podcast-categoria)
- A aplicação não utiliza nenhum framework backend (como Express ou Nest).
- O projeto usa **Node.js com TypeScript**, módulos ES e SQLite puro.
- Toda lógica de negócio, acesso a dados e roteamento foi implementada do zero.

<br />

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco **educacional**, para demonstrar na prática:

- O uso de Node.js sem frameworks
- Aplicação de princípios de arquitetura por camadas
- Operações CRUD básicas em APIs REST
- Uso de SQLite com relacionamentos e migração automática

<br />

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstrativos. 
