import { app, dialog, ipcMain } from "electron"

import { Channels } from "../renderer/types"
import { EngineManager, sendFreePort } from "./utils"

export const engineManager = new EngineManager(app)

export async function initMain() {
  ipcMain.handle(Channels.selectDir, handleSelectDir)
  ipcMain.handle(Channels.selectPdf, handleSelectPdf)
  await sendFreePort()
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

async function handleSelectPdf() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  })
  if (!canceled) {
    console.log(`onSelectPdf: ${filePaths[0]}`)
    return filePaths[0]
  }
  return null
}
