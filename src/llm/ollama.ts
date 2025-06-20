import { ChatOllama } from 'langchain/chat_models/ollama'

export const ollama = new ChatOllama({
  baseUrl: import.meta.env.VITE_OLLAMA_BASEURL,
  model: import.meta.env.VITE_MODEL_NAME || 'mistral',
})
