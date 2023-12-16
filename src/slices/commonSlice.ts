import { FlashbarProps } from "@cloudscape-design/components"
import { SettingsService } from "../../openapi-client"

export interface CommonSlice {
  navigationOpen: boolean;
  appDataDirectory: string | null;
  notifications: Array<FlashbarProps.MessageDefinition>;

  initAppDataDirectory(): Promise<void>;
  setAppDataDirectory(directory: string): void;
  clearAppDataDirectory(): void;
  addNotification(message: FlashbarProps.MessageDefinition): void;
  removeNotification(id: string): void;
}

export const commonSlice: CommonSlice = {
  navigationOpen: true,
  appDataDirectory: null,
  notifications: [],

  async initAppDataDirectory() {
    const dir = localStorage.getItem("app-data-directory")
    if (!dir) return
    const { valid } = await SettingsService.postSettingsAppDataDirectoryValidate({ app_data_directory: dir })
    if (valid) {
      this.appDataDirectory = dir
    } else {
      this.clearAppDataDirectory()
    }
  },
  setAppDataDirectory(directory: string) {
    localStorage.setItem("app-data-directory", directory)
    commonSlice.appDataDirectory = directory
  },
  clearAppDataDirectory() {
    localStorage.removeItem("app-data-directory")
    commonSlice.appDataDirectory = null
  },
  addNotification(message: FlashbarProps.MessageDefinition) {
    commonSlice.notifications.push(message)
  },
  removeNotification(id: string) {
    commonSlice.notifications = commonSlice.notifications.filter(n => n.id !== id)
  }
}
