import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectProps } from "@cloudscape-design/components"
import { getPage } from "./stepsUtils"
import { OpenPdfOut, ProjectService } from "../../../openapi-client"
import { RootState } from "../../common/store"

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
  pageTypeSampleIndex: Record<number, number>;
  pageAnnotationEditorOpen: boolean;
  annotationEditorPageUrl?: string;
  finishedPageTypes: Record<number, boolean>;
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
  pageTypeSampleIndex: {},
  pageAnnotationEditorOpen: false,
  annotationEditorPageUrl: undefined,
  finishedPageTypes: {},
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
    updateSamplePage: (state, action: PayloadAction<LoadPageType>) => {
      const { pageTypeSampleIndex, selectedPageTypeIndex, openPdfOut } = state
      let newIndex = pageTypeSampleIndex[selectedPageTypeIndex]

      if (action.payload === "next") {
        newIndex += 1
      } else if (action.payload === "previous") {
        newIndex -= 1
      }

      pageTypeSampleIndex[selectedPageTypeIndex] = newIndex
      const pageNumber = openPdfOut?.page_types[selectedPageTypeIndex].page_numbers[newIndex]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
    },
    openAnnotationEditor: (state, pageType: PayloadAction<number>) => {
      state.selectedPageTypeIndex = pageType.payload
      const pageNumber = state.openPdfOut?.page_types[pageType.payload].page_numbers[state.pageTypeSampleIndex[pageType.payload]]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
      state.pageAnnotationEditorOpen = true
    },
    closeAnnotationEditor: (state) => {
      state.pageAnnotationEditorOpen = false
    },
    toggleFinishPageType: (state) => {
      const pageType = state.selectedPageTypeIndex
      state.finishedPageTypes[pageType] = !state.finishedPageTypes[pageType]
    }
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
    console.debug("openPdfOut", openPdfOut)

    const pageTypeSampleIndex: Record<number, number> = {}
    for (let i = 0; i < openPdfOut.page_types.length; i++) {
      pageTypeSampleIndex[i] = 0
    }

    dispatch(newProjectSlice.actions.updateSlice({ openPdfOut, pageTypeSampleIndex: pageTypeSampleIndex }))
  }
)

export type LoadPageType = "next" | "previous" | "random"

export const newProjectReducer = newProjectSlice.reducer
export const newProjectActions = newProjectSlice.actions
export const newProjectSelector = (state: RootState) => state.newProject
