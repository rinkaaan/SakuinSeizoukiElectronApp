import { app, dialog, ipcMain } from "electron"

import { Channels } from "../renderer/types"
import { EngineManager, sendFreePort } from "./utils"

export const engineManager = new EngineManager(app)

export async function initMain() {
  ipcMain.handle(Channels.selectDir, handleSelectDir)
  ipcMain.handle(Channels.selectPdf, handleSelectPdf)
  ipcMain.handle(Channels.downloadFile, handleDownloadFile)
  await sendFreePort()
}

async function handleSelectDir() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  })
  if (!canceled) {
    return filePaths[0]
  }
  return null
}

async function handleSelectPdf() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  })
  if (!canceled) {
    return filePaths[0]
  }
  return null
}

async function handleDownloadFile(event: Electron.IpcMainInvokeEvent, filename: string, title: string, extensionName: string, extensions: string[]) {
  const downloadsPath = app.getPath("downloads")
  const { canceled, filePath } = await dialog.showSaveDialog({
    title,
    defaultPath: `${downloadsPath}/${filename}`,
    filters: [{ name: extensionName, extensions }],
  })
  if (!canceled) {
    return filePath
  }
  return null
}
