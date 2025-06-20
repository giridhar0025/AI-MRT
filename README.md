# AI-MRT

A zero-cost, offline AI-powered dashboard built with React 18, TypeScript, Vite and Tailwind CSS. It uses Material UI and Material React Table (v3) for rendering data and provides a chat interface powered by a local LLM via Ollama.

## Setup

Requirements:

- Node.js 18+
- [pnpm](https://pnpm.io/)
- [Ollama](https://ollama.ai/) running locally

```bash
pnpm install
pnpm dev
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
pnpm test
```
