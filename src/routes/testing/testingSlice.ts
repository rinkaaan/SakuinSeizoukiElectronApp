import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TestingRootState } from "./testingStore"

export interface TestingState {
  appDataDirectory?: string | null;
}

const initialState: TestingState = {
  appDataDirectory: undefined,
}

export const testingSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<TestingState>>) => {
      return { ...state, ...action.payload }
    },
    resetSlice: () => {
      return initialState
    }
  },
})
export const testingReducer = testingSlice.reducer
export const testingActions = testingSlice.actions
export const testingSelector = (state: TestingRootState) => state.testing
