import { z } from 'zod'
import { ollama } from './ollama'
import { logger } from '../utils/logger'

export const toolCallSchema = z.union([
  z.object({
    action: z.literal('applyFilter'),
    column: z.string(),
    operator: z.union([z.literal('equals'), z.literal('contains')]),
    value: z.string(),
  }),
  z.object({
    action: z.literal('applySort'),
    column: z.string(),
    direction: z.union([z.literal('asc'), z.literal('desc')]),
  }),
  z.object({
    action: z.literal('toggleColumnVisibility'),
    column: z.string(),
    visible: z.boolean(),
  }),
  z.object({
    action: z.literal('groupBy'),
    column: z.string(),
  }),
  z.object({
    action: z.literal('summarizeSelection'),
  }),
])

export type ToolCall = z.infer<typeof toolCallSchema>

const SYSTEM_PROMPT = `You are TableGPT, a UI assistant. Given a user message, respond ONLY with a JSON describing an action.`

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
