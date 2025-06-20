import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table'
import { RootState } from '../store'
import {
  setFilters,
  setSorting,
  setGrouping,
  toggleColumnVisibility,
  setSelection,
} from '../store/tableSlice'
import type { User } from '../data'

export default function DataGrid() {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.table)

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'createdAt', header: 'Created At' },
    ],
    [],
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={table.data}
      enableColumnPinning
      columnFilters={table.columnFilters}
      onColumnFiltersChange={(filters) => dispatch(setFilters(filters))}
      state={{
        columnFilters: table.columnFilters,
        sorting: table.sorting,
        grouping: table.grouping,
        columnVisibility: table.columnVisibility,
        rowSelection: table.selection.reduce((acc, id) => {
          acc[id] = true
          return acc
        }, {} as Record<number, boolean>),
      }}
      onSortingChange={(s) => dispatch(setSorting(s))}
      onGroupingChange={(g) => dispatch(setGrouping(g))}
      onColumnVisibilityChange={(updater) => {
        const [col, visible] = Object.entries(updater)[0] as [string, boolean]
        dispatch(toggleColumnVisibility({ column: col, visible }))
      }}
      onRowSelectionChange={(updater) => {
        const ids = Object.entries(updater)
          .filter(([, v]) => v)
          .map(([k]) => Number(k))
        dispatch(setSelection(ids))
      }}
    />
  )
}
