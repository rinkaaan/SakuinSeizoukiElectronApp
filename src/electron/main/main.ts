import { ipcMain } from "electron"

import { Channels } from "../renderer/types"

export async function initMain() {
  ipcMain.on(Channels.sendAppDataDir, (_event, dir) => {
    console.log("appDataDir:", dir)
  })
}
