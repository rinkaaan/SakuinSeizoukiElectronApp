import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut } from "../../openapi-client"

export interface NewProjectState {
  latestStepIndex: number;

  // step 1
  openPdfOut?: OpenPdfOut;
  pdfPath?: string;
  missingPdf: boolean;
}

const initialState: NewProjectState = {
  latestStepIndex: 0,

  // step 1
  openPdfOut: undefined,
  pdfPath: undefined,
  missingPdf: false,
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