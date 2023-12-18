import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { appDispatch, RootState } from "../common/store"
import { OpenAPI, SettingsService } from "../../openapi-client"
import { socketManager } from "../common/clients"
import { FlashbarProps } from "@cloudscape-design/components"
import { uuid } from "../common/typedUtils"

export interface CommonState {
  navigationOpen: boolean;
  notifications: Array<FlashbarProps.MessageDefinition>;
  engineReady: boolean;
  appDataDirectory?: string | null;
}

const initialState: CommonState = {
  navigationOpen: true,
  notifications: [],
  engineReady: false,
  appDataDirectory: undefined,
}

type Notification = Pick<FlashbarProps.MessageDefinition, "type" | "content">

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<CommonState>>) => {
      return { ...state, ...action.payload }
    },
    addNotification(state, action: PayloadAction<Notification>) {
      const notification: FlashbarProps.MessageDefinition = {
        ...action.payload,
        dismissible: true,
        id: uuid(),
        // onDismiss: () => {
        //   state.notifications = state.notifications.filter(n => n.id !== notification.id)
        // },
      }
      state.notifications.push(notification)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export function prepareNotifications(notifications: Array<FlashbarProps.MessageDefinition>) {
  return notifications.map(n => ({
    ...n,
    onDismiss: () => {
      appDispatch(commonActions.removeNotification(n.id))
    },
  }))
}

export const initApp = createAsyncThunk(
  "common/initApp",
  async (_, { dispatch }) => {
    const enginePort = localStorage.getItem("engine-port")
    if (enginePort) {
      OpenAPI.BASE = `http://127.0.0.1:${enginePort}`
      socketManager.connect(parseInt(enginePort))
    }
    if (socketManager.isConnected()) {
      dispatch(commonActions.updateSlice({ engineReady: true }))
    }
  }
)

export const setAppDataDirectory = createAsyncThunk(
  "common/setAppDataDirectory",
  async (directory: string, { dispatch }) => {
    const { valid } = await SettingsService.postSettingsAppDataDirectory({ app_data_directory: directory })
    if (valid) {
      localStorage.setItem("app-data-directory", directory)
      dispatch(commonActions.updateSlice({ appDataDirectory: directory }))
    } else {
      localStorage.removeItem("app-data-directory")
      dispatch(commonActions.updateSlice({ appDataDirectory: null }))
    }
  }
)

export const commonReducer = commonSlice.reducer
export const commonActions = commonSlice.actions
export const commonSelector = (state: RootState) => state.common
