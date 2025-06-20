import type { AppDispatch } from '../state'
import {
  addColumn,
  removeColumn,
  renameColumn,
  reorderColumns,
  setFilters,
  setSorting,
  setGrouping,
  setPage,
  setPageSize,
} from '../state/tableSlice'
import { addRule, clearRules } from '../state/highlightSlice'
import type { ToolCall } from '../app/zodSchemas'

export function routeToolCall(tool: ToolCall, dispatch: AppDispatch) {
  switch (tool.action) {
    case 'addColumn':
      dispatch(addColumn(tool.column))
      break
    case 'removeColumn':
      dispatch(removeColumn(tool.columnId))
      break
    case 'renameColumn':
      dispatch(renameColumn({ id: tool.columnId, header: tool.newHeader }))
      break
    case 'reorderColumns':
      dispatch(reorderColumns(tool.order))
      break
    case 'applyFilter':
      dispatch(setFilters([{ id: tool.columnId, value: tool.value }]))
      break
    case 'clearFilters':
      dispatch(setFilters([]))
      break
    case 'applySort':
      dispatch(setSorting([{ id: tool.columnId, desc: tool.direction === 'desc' }]))
      break
    case 'groupBy':
      dispatch(setGrouping(tool.columns))
      break
    case 'setPage':
      dispatch(setPage(tool.page))
      break
    case 'setPageSize':
      dispatch(setPageSize(tool.size))
      break
    case 'highlight':
      dispatch(addRule({ target: tool.target, columnId: tool.columnId, condition: tool.condition as any, style: tool.style }))
      break
    case 'clearHighlights':
      dispatch(clearRules())
      break
    default:
      break
  }
}
