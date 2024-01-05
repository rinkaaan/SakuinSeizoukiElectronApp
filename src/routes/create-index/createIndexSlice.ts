import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { SelectProps } from "@cloudscape-design/components"
import { getPage } from "./stepsUtils"
import { CreateIndexOut, GetPageTypesOut, GetWordListOut, IndexService, OpenAPI, PageTypeDetail, PdfService, WordListService } from "../../../openapi-client"
import { getRandomColor } from "../../common/typedUtils"
import store from "../../common/store"
import type { RootState } from "../../common/reducers"
import { getActionName } from "../../common/utils"

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
  isLoading: Record<string, boolean>

  // step 1
  getPageTypesOut?: GetPageTypesOut;
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

  // step4
  createIndexOut?: CreateIndexOut;
  downloadLink?: string;
}

const initialState: NewProjectState = {
  latestStepIndex: 0,
  isLoadingNextStep: false,
  pageImage: undefined,
  errorMessages: {},
  isLoading: {},

  // step 1
  getPageTypesOut: undefined,
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

  // step4
  createIndexOut: undefined,
  downloadLink: undefined,
}

export const createIndexSlice = createSlice({
  name: "createIndex",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<NewProjectState>>) => {
      return { ...state, ...action.payload }
    },
    resetSlice: () => initialState,
    updateSamplePage: (state, action: PayloadAction<LoadPageType>) => {
      const { pageTypeSampleIndex, selectedPageTypeIndex, getPageTypesOut } = state
      let newIndex = pageTypeSampleIndex[selectedPageTypeIndex]

      if (action.payload === "next") {
        newIndex += 1
      } else if (action.payload === "previous") {
        newIndex -= 1
      } else if (typeof action.payload === "number") {
        newIndex = action.payload - 1
      }

      if (newIndex < 0 || newIndex >= getPageTypesOut?.page_types[selectedPageTypeIndex].page_numbers.length) {
        return
      }

      const pageNumber = getPageTypesOut?.page_types[selectedPageTypeIndex].page_numbers[newIndex]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
      pageTypeSampleIndex[selectedPageTypeIndex] = newIndex
    },
    openAnnotationEditor: (state, pageType: PayloadAction<number>) => {
      state.selectedPageTypeIndex = pageType.payload
      const pageNumber = state.getPageTypesOut?.page_types[pageType.payload].page_numbers[state.pageTypeSampleIndex[pageType.payload]]
      state.annotationEditorPageUrl = getPage({ pageNumber, pdfPath: state.pdfFile?.path })
      state.pageAnnotationEditorOpen = true
    },
    closeAnnotationEditor: (state) => {
      state.pageAnnotationEditorOpen = false
    },
    toggleFinishPageType: (state) => {
      const pageType = state.selectedPageTypeIndex
      state.finishedPageTypes[pageType] = !state.finishedPageTypes[pageType]
      if (state.finishedPageTypes[pageType]) {
        state.currentColor = getRandomColor()
        state.pageAnnotationEditorOpen = false
      }
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
      state.currentColor = getRandomColor()
    },
    incrementPageTypeAnnotationTotalGroups: (state) => {
      const pageType = state.selectedPageTypeIndex
      const groupIndex = state.pageTypeAnnotationCurrentGroupIndex[pageType] || 0
      state.pageTypeAnnotationCurrentGroupIndex[pageType] = groupIndex + 1
      state.currentColor = getRandomColor()
    },
    addErrorMessage: (state, action: PayloadAction<{ key: string, message: string }>) => {
      state.errorMessages[action.payload.key] = action.payload.message
    },
    addMissingErrorMessage: (state, action: PayloadAction<string>) => {
      // state.errorMessages[action.payload] = "Required"
      state.errorMessages[action.payload] = "必須です"
    },
    clearErrorMessages: (state) => {
      state.errorMessages = {}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPdfPageTypes.fulfilled, (state => {
        const { getPageTypesOut } = state
        const pageTypeOptions: SelectProps.Option[] = []

        for (let i = 0; i < getPageTypesOut.page_types.length; i++) {
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
      .addMatcher(isPending, (state, action) => {
        state.isLoading[getActionName(action)] = true
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading[getActionName(action)] = false
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.isLoading[getActionName(action)] = false
      })
  }
})

export const getPdfPageTypes = createAsyncThunk(
  "createIndex/getPdfPageTypes",
  async (pdfPath: string, { dispatch }) => {
    const getPageTypesOut = await PdfService.getPdfPageTypes(pdfPath)

    const pageTypeSampleIndex: Record<number, number> = {}
    for (let i = 0; i < getPageTypesOut.page_types.length; i++) {
      pageTypeSampleIndex[i] = getPageTypesOut.page_types[i].page_numbers.length - 1
    }

    dispatch(createIndexSlice.actions.updateSlice({ getPageTypesOut, pageTypeSampleIndex: pageTypeSampleIndex }))
  }
)

export const getWordList = createAsyncThunk(
  "createIndex/getWordList",
  async (_payload,{ dispatch }) => {
    const { wordListFile, startCell, endCell, sheetName } = store.getState().createIndex
    const getWordListOut = await WordListService.getWordList(wordListFile.path, sheetName, startCell, endCell)
    dispatch(createIndexSlice.actions.updateSlice({ getWordListOut }))
  }
)

export const createIndex = createAsyncThunk(
  "createIndex/createIndex",
  async (_payload, { dispatch }) => {
    const { getPageTypesOut, wordListFile, pdfFile, startCell, endCell, sheetName, pageTypeAnnotations } = store.getState().createIndex

    const pageTypes: Record<string, PageTypeDetail> = {}

    // Add page types as keys with empty objects as values
    for (const pageType of getPageTypesOut.page_types) {
      if (!pageTypeAnnotations[pageType.type]) continue
      pageTypes[pageType.type] = {
        annotations: [],
      }
      // Add annotations to each page type
      for (const rectangle of pageTypeAnnotations[pageType.type]) {
        pageTypes[pageType.type].annotations.push({
          width: rectangle.width,
          height: rectangle.height,
          group_index: rectangle.groupIndex,
          x: rectangle.x,
          y: rectangle.y,
        })
      }
      // Add page numbers to each page type
      pageTypes[pageType.type].page_numbers = getPageTypesOut.page_types[pageType.type].page_numbers
    }

    const createIndexOut = await IndexService.postIndexCreate({
      list_path: wordListFile.path,
      start_cell: startCell,
      end_cell: endCell,
      sheet_name: sheetName,
      page_types: pageTypes,
      pdf_path: pdfFile.path,
    })
    dispatch(createIndexActions.updateSlice({ createIndexOut }))
  }
)

export const getIndex = createAsyncThunk(
  "createIndex/getIndex",
  async (_payload) => {
    const { createIndexOut } = store.getState().createIndex
    const index = await IndexService.postIndexGet(createIndexOut)
    const a = document.createElement("a")
    a.href = `${OpenAPI.BASE}${index.url}`
    a.download = "index.xlsx"
    a.click()
    try {
      URL.revokeObjectURL(index.url)
      document.body.removeChild(a)
    } catch (e) {
      console.error(e)
    }
  }
)

export type LoadPageType = "next" | "previous" | "random" | number

export const createIndexReducer = createIndexSlice.reducer
export const createIndexActions = createIndexSlice.actions
export const createIndexSelector = (state: RootState) => state.createIndex

export const currentPageTypeAnnotationsSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotations } = state.createIndex
  return pageTypeAnnotations[selectedPageTypeIndex] || []
}

export const currentPageTypeAnnotationTotalGroupsSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotationCurrentGroupIndex } = state.createIndex
  return (pageTypeAnnotationCurrentGroupIndex[selectedPageTypeIndex] || 0) + 1
}

export const disableNewGroupButtonSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotations, pageTypeAnnotationCurrentGroupIndex } = state.createIndex

  // Don't increment if there are number annotations is less than 2
  const groupIndex = pageTypeAnnotationCurrentGroupIndex[selectedPageTypeIndex] || 0

  const numberAnnotations = pageTypeAnnotations[selectedPageTypeIndex]?.filter(r => r.groupIndex === groupIndex)
  return !numberAnnotations || numberAnnotations.length < 2
}

export const disableRefreshColorSelector = (state: RootState) => {
  const { selectedPageTypeIndex, pageTypeAnnotations, pageTypeAnnotationCurrentGroupIndex } = state.createIndex

  // Don't refresh if there are annotations
  const groupIndex = pageTypeAnnotationCurrentGroupIndex[selectedPageTypeIndex] || 0
  const numberAnnotations = pageTypeAnnotations[selectedPageTypeIndex]?.filter(r => r.groupIndex === groupIndex)
  return numberAnnotations && numberAnnotations.length > 0
}
