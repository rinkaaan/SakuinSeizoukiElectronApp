import { ipcMain, dialog } from "electron"

import { Channels } from "../renderer/types"
import { sendFreePort } from "./utils"

export async function initMain() {
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
