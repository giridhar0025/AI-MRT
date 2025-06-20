import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import type { RootState } from '../../state'
import {
  setFilters,
  setSorting,
  setGrouping,
  setPage,
  setPageSize,
} from '../../state/tableSlice'
import { buildColumns } from '../../lib/columnsFactory'

export default function DataGrid() {
  const dispatch = useDispatch()
  const table = useSelector((s: RootState) => s.table)
  const highlight = useSelector((s: RootState) => s.highlight.rules)

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => buildColumns(table.columns), [table.columns])

  return (
    <MaterialReactTable
      columns={columns}
      data={table.data}
      state={{
        columnFilters: table.columnFilters,
        sorting: table.sorting,
        grouping: table.grouping,
        pagination: { pageIndex: table.page, pageSize: table.pageSize },
      }}
      onColumnFiltersChange={(f:any)=>dispatch(setFilters(f))}
      onSortingChange={(s:any)=>dispatch(setSorting(s))}
      onGroupingChange={(g:any)=>dispatch(setGrouping(g))}
      onPaginationChange={({ pageIndex, pageSize }: any)=>{
        dispatch(setPage(pageIndex));
        dispatch(setPageSize(pageSize));
      }}
      muiTableBodyCellProps={({ cell }) => {
        const styles: any = {}
        for (const r of highlight) {
          if (r.target === 'cell' && r.columnId === cell.column.id) {
            if (cell.getValue() === r.condition.value) Object.assign(styles, r.style)
          }
        }
        return { style: styles }
      }}
    />
  )
}
