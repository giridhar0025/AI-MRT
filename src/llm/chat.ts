import { ollama } from './ollama'
import { logger } from '../utils/logger'
import { toolCallSchema, type ToolCall } from '../app/zodSchemas'

const SYSTEM_PROMPT = `You are TableGPT, an assistant that controls a React-based data grid. Respond ONLY with JSON conforming to one ToolCall schema.`

export async function getToolCall(message: string, context: string): Promise<ToolCall | null> {
  const prompt = `${SYSTEM_PROMPT}\nContext: ${context}\nUser: ${message}`
  try {
    const res = await ollama.invoke(prompt)
    const json = JSON.parse(res.content)
    const parsed = toolCallSchema.safeParse(json)
    if (parsed.success) {
      return parsed.data
    }
    logger.error('invalid tool call', res.content)
  } catch (err) {
    logger.error('ollama error', err)
  }
  return null
}
