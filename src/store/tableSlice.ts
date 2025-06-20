import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table'
import { users, type User } from '../data'

export interface TableState {
  data: User[]
  columnFilters: MRT_ColumnFiltersState
  sorting: MRT_SortingState
  grouping: string[]
  columnVisibility: Record<string, boolean>
  selection: number[]
}

const initialState: TableState = {
  data: users,
  columnFilters: [],
  sorting: [],
  grouping: [],
  columnVisibility: {},
  selection: [],
}

type FilterPayload = MRT_ColumnFiltersState

type SortPayload = MRT_SortingState

type ColumnVisibilityPayload = { column: string; visible: boolean }

type GroupPayload = string

type SelectionPayload = number[]

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterPayload>) {
      state.columnFilters = action.payload
    },
    setSorting(state, action: PayloadAction<SortPayload>) {
      state.sorting = action.payload
    },
    setGrouping(state, action: PayloadAction<GroupPayload[]>) {
      state.grouping = action.payload
    },
    toggleColumnVisibility(state, action: PayloadAction<ColumnVisibilityPayload>) {
      state.columnVisibility[action.payload.column] = action.payload.visible
    },
    setSelection(state, action: PayloadAction<SelectionPayload>) {
      state.selection = action.payload
    },
  },
})

export const {
  setFilters,
  setSorting,
  setGrouping,
  toggleColumnVisibility,
  setSelection,
} = tableSlice.actions

export default tableSlice.reducer
