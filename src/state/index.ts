import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableSlice'
import highlightReducer from './highlightSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    table: tableReducer,
    highlight: highlightReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
