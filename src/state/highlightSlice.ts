import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

export interface HighlightRule {
  id: string
  target: 'cell' | 'row'
  columnId?: string
  condition: { operator: string; value: any }
  style: { color?: string; backgroundColor?: string; icon?: string; fontWeight?: string }
}

interface HighlightState {
  rules: HighlightRule[]
}

const initialState: HighlightState = { rules: [] }

export const highlightSlice = createSlice({
  name: 'highlight',
  initialState,
  reducers: {
    addRule(state, action: PayloadAction<Omit<HighlightRule, 'id'>>) {
      if (state.rules.length >= 50) return
      state.rules.push({ ...action.payload, id: nanoid() })
    },
    clearRules(state) {
      state.rules = []
    },
  },
})

export const { addRule, clearRules } = highlightSlice.actions
export default highlightSlice.reducer
