# AI-MRT

A zero-cost, offline AI-powered dashboard built with React 18, TypeScript, Vite and Tailwind CSS. It uses Material UI and Material React Table (v3) for rendering data and provides a chat interface powered by a local LLM via Ollama.

## Setup

Requirements:

- Node.js 18+
- [npm](https://www.npmjs.com/)
- [Ollama](https://ollama.ai/) running locally

```bash
npm install
npm run dev
```

Pull the LLM model (default `mistral`):

```bash
ollama pull mistral
```

Create a `.env` based on `.env.example` if you need to customise the model or endpoint.

## Usage

Press **Ctrl+K** to open the chat panel. Examples:

- `filter status = active`
- `sort by createdAt descending`
- `group by role`
- `hide email column`
- `summarize selected`

## Common Issues

- **Ollama not running** – ensure the Ollama server is started on `http://localhost:11434`.
- **Port already in use** – change the Vite port or stop other services.
- **CORS errors** – disable browser extensions that modify headers.

## Testing

Run unit tests with Vitest:

```bash
npm test
```

## Phase-2 Features

- Runtime column management (add, remove, rename, reorder)
- Computed columns with guarded formulas
- Highlight and icon rules
- Optional dynamic cell renderers
- Pagination, grouping and selection
- AI summaries of visible rows

### Environment Flags

- `VITE_ALLOW_FORMULAS` – enable computed columns
- `VITE_ALLOW_DYNAMIC_RENDERERS` – allow runtime cell renderers
- `VITE_MAX_COMPUTED_COLUMNS` – maximum number of computed columns

### New AI Commands

The assistant now accepts ToolCalls to mutate any table capability. Examples:

- `{"action":"addColumn","column":{"id":"profit","header":"Profit"}}`
- `{"action":"highlight","target":"row","condition":{"operator":"=","value":"blocked"},"style":{"backgroundColor":"red"}}`

