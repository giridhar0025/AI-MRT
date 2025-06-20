import type { MRT_ColumnDef } from 'material-react-table'
import { getRenderer } from './cellRenderRegistry'
import { isFormulaSafe } from './formulaGuard'

export interface ColumnDefinition {
  id: string
  header: string
  accessorKey?: string
  formula?: string
  size?: number
  pinned?: 'left' | 'right'
}

export function buildColumns(cols: ColumnDefinition[]): MRT_ColumnDef<any>[] {
  return cols.map((col) => {
    const Cell = getRenderer(col.id)
    const def: MRT_ColumnDef<any> = {
      header: col.header,
      accessorKey: col.accessorKey ?? col.id,
      size: col.size,
    }
    if (Cell) {
      // @ts-ignore
      def.Cell = ({ cell }) => Cell(cell.getValue())
    }
    if (col.formula && isFormulaSafe(col.formula)) {
      def.accessorFn = (row: any) => {
        try {
          return Function('row', `return ${col.formula}`)(row)
        } catch {
          return null
        }
      }
    }
    return def
  })
}
