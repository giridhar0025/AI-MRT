import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

type Density = 'compact' | 'comfortable'

interface UIState {
  density: Density
}

const initialState: UIState = { density: 'comfortable' }

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDensity(state, action: PayloadAction<Density>) {
      state.density = action.payload
    },
  },
})

export const { setDensity } = uiSlice.actions
export default uiSlice.reducer
