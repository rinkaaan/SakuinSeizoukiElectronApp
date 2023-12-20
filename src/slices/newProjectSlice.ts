import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut, ProjectService } from "../../openapi-client"
import { SelectProps } from "@cloudscape-design/components"

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
  pageTypeOptions: SelectProps.Option[];
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
  pageTypeOptions: [],
}

export const newProjectSlice = createSlice({
  name: "newProject",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<NewProjectState>>) => {
      return { ...state, ...action.payload }
    },
    resetSlice: () => initialState,
    incrementPageTypeIndex: (state) => {
      state.selectedPageTypeIndex += 1
    },
    decrementPageTypeIndex: (state) => {
      state.selectedPageTypeIndex -= 1
    },
  },
  extraReducers: builder => {
    builder
      .addCase(openPdf.fulfilled, (state => {
        const { openPdfOut } = state
        const pageTypeOptions: SelectProps.Option[] = []

        for (let i = 0; i < openPdfOut.page_types.length; i++) {
          pageTypeOptions.push({
            label: `Type ${i + 1}`,
            value: (i + 1).toString(),
          })
        }

        Object.assign(state, {
          selectedPageTypeIndex: 0,
          pageTypeOptions,
        })
      }))
  }
})

export const openPdf = createAsyncThunk(
  "newProject/openPdf",
  async (pdfPath: string, { dispatch }) => {
    const openPdfOut = await ProjectService.postProjectNewPdf({ pdf_path: pdfPath })
    console.log("openPdfOut", openPdfOut)
    dispatch(newProjectSlice.actions.updateSlice({ openPdfOut }))
  }
)

export const newProjectReducer = newProjectSlice.reducer
export const newProjectActions = newProjectSlice.actions
export const newProjectSelector = (state: RootState) => state.newProject
