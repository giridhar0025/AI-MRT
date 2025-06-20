import { env } from '../env'
import type { ReactNode } from 'react'

const registry = new Map<string, (value: any) => ReactNode>()

export function registerRenderer(id: string, fn: (value: any) => ReactNode) {
  if (!env.ALLOW_DYNAMIC_RENDERERS) return
  registry.set(id, fn)
}

export function getRenderer(id: string) {
  return registry.get(id)
}

export function clearRenderers() {
  registry.clear()
}
