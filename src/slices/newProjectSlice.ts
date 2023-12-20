import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut } from "../../openapi-client"

export interface NewProjectState {
  latestStepIndex: number;
  isLoadingNextStep: boolean;
  pageImage?: string;

  // step 1
  openPdfOut?: OpenPdfOut;
  pdfFile?: File;
  missingPdf: boolean;

  // step 2
  selectedPageTypeIndex: number;
}

const initialState: NewProjectState = {
  latestStepIndex: 0,
  isLoadingNextStep: false,
  pageImage: undefined,

  // step 1
  openPdfOut: undefined,
  pdfFile: undefined,
  missingPdf: false,

  // step 2
  selectedPageTypeIndex: 0,
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
