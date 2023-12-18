import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut } from "../../openapi-client"

export interface NewProjectState {
  openPdfOut?: OpenPdfOut;
}

const initialState: NewProjectState = {
  openPdfOut: undefined,
}

export const newProjectSlice = createSlice({
  name: "newProject",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<NewProjectState>>) => {
      return { ...state, ...action.payload }
    },
    resetSlice: () => initialState,
  },
})

export const newProjectReducer = newProjectSlice.reducer
export const newProjectActions = newProjectSlice.actions
export const newProjectSelector = (state: RootState) => state.newProject
