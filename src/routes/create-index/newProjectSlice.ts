import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectProps } from "@cloudscape-design/components"
import { getPage } from "./stepsUtils"
import { GetWordListOut, OpenPdfOut, ProjectService } from "../../../openapi-client"
import { getRandomColor } from "../../common/typedUtils"
import store from "../../common/store"
import type { RootState } from "../../common/reducers"

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  groupIndex: number;
  color: string;
}

export interface NewProjectState {
  latestStepIndex: number;
  isLoadingNextStep: boolean;
  pageImage?: string;
  errorMessages: Record<string, string>;

  // step 1
  openPdfOut?: OpenPdfOut;
  pdfFile?: File;

  // step 2
  selectedPageTypeIndex: number;
  pageTypeOptions: SelectProps.Option[];
  pageTypeSampleIndex: Record<number, number>;
  pageTypeAnnotations: Record<number, Rectangle[]>;
  pageTypeAnnotationCurrentGroupIndex: Record<number, number>;
  pageAnnotationEditorOpen: boolean;
  annotationEditorPageUrl?: string;
  finishedPageTypes: Record<number, boolean>;
  currentColor: string;

  // step 3
  wordListFile?: File;
  startCell: string;
  endCell: string;
  sheetName: string;
  getWordListOut?: GetWordListOut;
}

const initialState: NewProjectState = {
  latestStepIndex: 0,
  isLoadingNextStep: false,
  pageImage: undefined,
  errorMessages: {},

  // step 1
  openPdfOut: undefined,
  pdfFile: undefined,

  // step 2
  selectedPageTypeIndex: 0,
  pageTypeAnnotations: {},
  pageTypeAnnotationCurrentGroupIndex: {},
  pageTypeOptions: [],
  pageTypeSampleIndex: {},
  pageAnnotationEditorOpen: false,
  annotationEditorPageUrl: undefined,
  finishedPageTypes: {},
  currentColor: getRandomColor(),

  // step 3
  wordListFile: undefined,
  startCell: "A2",
  endCell: "",
  sheetName: "Sheet1",
  getWordListOut: undefined,
}

export const newProjectSlice = createSlice({
  name: "newProject",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<NewProjectState>>) => {
      return { ...state, ...action.payload, errorMessages: {} }
    },
    resetSlice: () => initialState,
    updateSamplePage: (state, action: PayloadAction<LoadPageType>) => {
      const { pageTypeSampleIndex, selectedPageTypeIndex, openPdfOut } = state
      let newIndex = pageTypeSampleIndex[selectedPageTypeIndex]

      if (action.payload === "next") {
        newIndex += 1
      } else if (action.payload === "previous") {
        newIndex -= 1
      } else if (typeof action.payload === "number") {
        newIndex = action.payload - 1
      }

      if (newIndex < 0 || newIndex >= openPdfOut?.page_types[selectedPageTypeIndex].page_numbers.length) {
        return
      }

      const pageNumber = openPdfOut?.page_types[selectedPageTypeIndex].page_numbers[newIndex]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
      pageTypeSampleIndex[selectedPageTypeIndex] = newIndex
    },
    openAnnotationEditor: (state, pageType: PayloadAction<number>) => {
      // appDispatch(mainActions.updateSlice({ lockScroll: true }))
      state.selectedPageTypeIndex = pageType.payload
      const pageNumber = state.openPdfOut?.page_types[pageType.payload].page_numbers[state.pageTypeSampleIndex[pageType.payload]]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
      state.pageAnnotationEditorOpen = true
    },
    closeAnnotationEditor: (state) => {
      // appDispatch(mainActions.updateSlice({ lockScroll: false }))
      state.pageAnnotationEditorOpen = false
    },
    toggleFinishPageType: (state) => {
      const pageType = state.selectedPageTypeIndex
      state.finishedPageTypes[pageType] = !state.finishedPageTypes[pageType]
    },
    clearPageTypeAnnotations: (state) => {
      const pageType = state.selectedPageTypeIndex
      state.pageTypeAnnotations[pageType] = []
      state.pageTypeAnnotationCurrentGroupIndex[pageType] = 0
    },
    addPageTypeAnnotation: (state, action: PayloadAction<Omit<Rectangle, "groupIndex">>) => {
      const pageType = state.selectedPageTypeIndex

      // Update rectangle so that width and height are positive
      if (action.payload.width < 0) {
        action.payload.x += action.payload.width
        action.payload.width *= -1
      }
      if (action.payload.height < 0) {
        action.payload.y += action.payload.height
        action.payload.height *= -1
      }

      const rectangle: Rectangle = {
        ...action.payload,
        groupIndex: state.pageTypeAnnotationCurrentGroupIndex[pageType] || 0,
        color: state.currentColor,
      }
      const newAnnotations = [...(state.pageTypeAnnotations[pageType] || []), rectangle]
      state.pageTypeAnnotations[pageType] = newAnnotations
    },
    refreshColor: (state) => {
      // Don't refresh if there are annotations
      const pageType = state.selectedPageTypeIndex
      const groupIndex = state.pageTypeAnnotationCurrentGroupIndex[pageType] || 0
      if (groupIndex > 0) {
        return
      }

      state.currentColor = getRandomColor()
    },
    incrementPageTypeAnnotationTotalGroups: (state) => {
      const pageType = state.selectedPageTypeIndex
      state.pageTypeAnnotationCurrentGroupIndex[pageType] = (state.pageTypeAnnotationCurrentGroupIndex[pageType] || 0) + 1
      state.currentColor = getRandomColor()
    },
    addErrorMessage: (state, action: PayloadAction<{ key: string, message: string }>) => {
      state.errorMessages[action.payload.key] = action.payload.message
    },
    addMissingErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages[action.payload] = "Required"
    },
    clearErrorMessages: (state) => {
      state.errorMessages = {}
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
      pageTypeSampleIndex[i] = openPdfOut.page_types[i].page_numbers.length - 1
    }

    dispatch(newProjectSlice.actions.updateSlice({ openPdfOut, pageTypeSampleIndex: pageTypeSampleIndex }))
  }
)

export const getWordList = createAsyncThunk(
  "newProject/getWordList",
  async (_payload,{ dispatch }) => {
    const { wordListFile, startCell, endCell, sheetName } = store.getState().newProject
    const getWordListOut = await ProjectService.getProjectGetWordList(wordListFile.path, sheetName, startCell, endCell)
    console.debug("getWordListOut", getWordListOut)
    dispatch(newProjectSlice.actions.updateSlice({ getWordListOut }))
  }
)

export type LoadPageType = "next" | "previous" | "random" | number

export const newProjectReducer = newProjectSlice.reducer
export const newProjectActions = newProjectSlice.actions
export const newProjectSelector = (state: RootState) => state.newProject

export const currentPageTypeAnnotationsSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotations } = state.newProject
  return pageTypeAnnotations[selectedPageTypeIndex] || []
}

export const currentPageTypeAnnotationTotalGroupsSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotationCurrentGroupIndex } = state.newProject
  return (pageTypeAnnotationCurrentGroupIndex[selectedPageTypeIndex] || 0) + 1
}
