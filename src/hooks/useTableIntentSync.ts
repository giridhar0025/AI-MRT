import { useSelector } from 'react-redux'
import type { RootState } from '../state'

export function useTableIntentSync() {
  const table = useSelector((s: RootState) => s.table)
  const highlight = useSelector((s: RootState) => s.highlight.rules)
  return JSON.stringify({ table, highlight })
}
