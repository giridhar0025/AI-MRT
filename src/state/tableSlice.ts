import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table'
import { users, type User } from '../data'
import type { ColumnDefinition } from '../lib/columnsFactory'

export interface TableState {
  data: User[]
  columns: ColumnDefinition[]
  columnFilters: MRT_ColumnFiltersState
  sorting: MRT_SortingState
  grouping: string[]
  selection: number[]
  page: number
  pageSize: number
}

const baseColumns: ColumnDefinition[] = [
  { id: 'id', header: 'ID' },
  { id: 'name', header: 'Name' },
  { id: 'email', header: 'Email' },
  { id: 'status', header: 'Status' },
  { id: 'role', header: 'Role' },
  { id: 'createdAt', header: 'Created At' },
]

const initialState: TableState = {
  data: users,
  columns: baseColumns,
  columnFilters: [],
  sorting: [],
  grouping: [],
  selection: [],
  page: 0,
  pageSize: 20,
}

type FilterPayload = MRT_ColumnFiltersState

type SortPayload = MRT_SortingState

type GroupPayload = string[]

type SelectionPayload = number[]

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn(state, action: PayloadAction<ColumnDefinition>) {
      state.columns.push({ ...action.payload, id: action.payload.id || nanoid() })
    },
    removeColumn(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter((c) => c.id !== action.payload)
    },
    renameColumn(state, action: PayloadAction<{ id: string; header: string }>) {
      const col = state.columns.find((c) => c.id === action.payload.id)
      if (col) col.header = action.payload.header
    },
    reorderColumns(state, action: PayloadAction<string[]>) {
      state.columns.sort((a, b) => action.payload.indexOf(a.id) - action.payload.indexOf(b.id))
    },
    setFilters(state, action: PayloadAction<FilterPayload>) {
      state.columnFilters = action.payload
    },
    setSorting(state, action: PayloadAction<SortPayload>) {
      state.sorting = action.payload
    },
    setGrouping(state, action: PayloadAction<GroupPayload>) {
      state.grouping = action.payload
    },
    setSelection(state, action: PayloadAction<SelectionPayload>) {
      state.selection = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
  },
})

export const {
  addColumn,
  removeColumn,
  renameColumn,
  reorderColumns,
  setFilters,
  setSorting,
  setGrouping,
  setSelection,
  setPage,
  setPageSize,
} = tableSlice.actions

export default tableSlice.reducer
