import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut } from "../../openapi-client"

export interface NewProjectState {
  latestStepIndex: number;
  isLoadingNextStep: boolean;
  pageImage?: string;

  // step 1
  openPdfOut?: OpenPdfOut;
  // pdfPath?: string;
  pdfFile?: File;
  missingPdf: boolean;
}

const initialState: NewProjectState = {
  latestStepIndex: 0,
  isLoadingNextStep: false,
  pageImage: undefined,

  // step 1
  openPdfOut: undefined,
  // pdfPath: undefined,
  pdfFile: undefined,
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
