import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../common/store"
import { OpenPdfOut, ProjectService } from "../../openapi-client"
import { SelectProps } from "@cloudscape-design/components"
import _ from "lodash"
import { getPage } from "../routes/projects/new-project/stepsUtils"

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
  pageTypeSamplePages: Record<number, number>;
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
  pageTypeSamplePages: {},
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
    getSamplePage: (state, action: PayloadAction<LoadPageType>) => {
      const { openPdfOut, pageTypeSamplePages, selectedPageTypeIndex } = state
      const { page_types } = openPdfOut
      const pageType = page_types[selectedPageTypeIndex]
      const currentPage = pageTypeSamplePages[selectedPageTypeIndex]
      let newPage: number

      if (action.payload === "next") {
        newPage = pageType.page_numbers[pageType.page_numbers.indexOf(currentPage) + 1]
      } else if (action.payload === "previous") {
        newPage = pageType.page_numbers[pageType.page_numbers.indexOf(currentPage) - 1]
      } else {
        newPage = _.sample(pageType.page_numbers)
      }
      console.log("currentPage", currentPage)
      console.log("newPage", newPage)

      if (newPage && newPage != currentPage) {
        pageTypeSamplePages[selectedPageTypeIndex] = newPage
        state.annotationEditorPageUrl = getPage(state.pageTypeSamplePages[selectedPageTypeIndex])
      }
    },
    openAnnotationEditor: (state, pageType: PayloadAction<number>) => {
      state.selectedPageTypeIndex = pageType.payload
      state.annotationEditorPageUrl = getPage(state.pageTypeSamplePages[pageType.payload])
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
    console.log("openPdfOut", openPdfOut)

    const pageTypeSamplePages: Record<number, number> = {}
    for (let i = 0; i < openPdfOut.page_types.length; i++) {
      const pageType = openPdfOut.page_types[i]
      pageTypeSamplePages[i] = _.sample(pageType.page_numbers)
    }

    dispatch(newProjectSlice.actions.updateSlice({ openPdfOut, pageTypeSamplePages }))
  }
)

export type LoadPageType = "next" | "previous" | "random"

export const newProjectReducer = newProjectSlice.reducer
export const newProjectActions = newProjectSlice.actions
export const newProjectSelector = (state: RootState) => state.newProject
