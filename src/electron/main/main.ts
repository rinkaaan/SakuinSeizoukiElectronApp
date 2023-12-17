import { ipcMain, dialog, app, BrowserWindow } from "electron"

import { Channels } from "../renderer/types"
import { EngineManager, sendFreePort } from "./utils"

export const engineManager = new EngineManager(app)

export async function initMain() {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    const window = BrowserWindow.getFocusedWindow()
    window.webContents.openDevTools()
  }
  ipcMain.on(Channels.sendAppDataDir, onSendAppDataDir)
  ipcMain.handle(Channels.selectDir, handleSelectDir)
  await sendFreePort()
}

function onSendAppDataDir(_event: Electron.IpcMainEvent, appDataDir: string) {
  console.log("appDataDir:", appDataDir)
}

async function handleSelectDir() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })
  if (!canceled) {
    console.log(`onSelectDir: ${filePaths[0]}`)
    return filePaths[0]
  }
  return null
}
