import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OpenAPI } from "../../openapi-client"
import { socketManager } from "../common/clients"
import { FlashbarProps } from "@cloudscape-design/components"
import { uuid } from "../common/typedUtils"
import type { RootState } from "../common/reducers"
import { newProjectActions } from "./create-index/newProjectSlice"

export interface MainState {
  navigationOpen: boolean;
  notifications: Array<FlashbarProps.MessageDefinition>;
  engineReady: boolean;
  dirty: boolean;
  dirtyModalVisible?: boolean;
  dirtyRedirectUrl?: string;
  lockScroll?: boolean;
  startingPath?: string;
}

const initialState: MainState = {
  navigationOpen: false,
  notifications: [],
  engineReady: false,
  dirty: false,
  dirtyModalVisible: false,
  dirtyRedirectUrl: undefined,
  lockScroll: false,
  startingPath: undefined,
}

type Notification = Pick<FlashbarProps.MessageDefinition, "type" | "content">

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<MainState>>) => {
      return { ...state, ...action.payload }
    },
    addNotification(state, action: PayloadAction<Notification>) {
      const notification: FlashbarProps.MessageDefinition = {
        ...action.payload,
        dismissible: true,
        id: uuid(),
      }
      state.notifications.push(notification)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    resetDirty(state) {
      state.dirty = false
      state.dirtyModalVisible = false
      state.dirtyRedirectUrl = undefined
    },
    resetSlice: () => {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(newProjectActions.updateSlice, (state, _action) => {
        state.dirty = true
      })
      .addCase(newProjectActions.openAnnotationEditor, (state, _action) => {
        state.lockScroll = true
      })
      .addCase(newProjectActions.closeAnnotationEditor, (state, _action) => {
        state.lockScroll = false
      })
  }
})

export function prepareNotifications(notifications: Array<FlashbarProps.MessageDefinition>) {
  return notifications.map(n => ({
    ...n,
    onDismiss: () => {
      // appDispatch(mainActions.removeNotification(n.id))
    },
  }))
}

export const initApp = createAsyncThunk(
  "main/initApp",
  async (_, { dispatch }) => {
    const enginePort = localStorage.getItem("engine-port")
    if (enginePort) {
      OpenAPI.BASE = `http://127.0.0.1:${enginePort}`
      socketManager.connect(parseInt(enginePort))
    }
    if (socketManager.isConnected()) {
      dispatch(mainActions.updateSlice({ engineReady: true }))
    }
  }
)

export const mainReducer = mainSlice.reducer
export const mainActions = mainSlice.actions
export const mainSelector = (state: RootState) => state.main
