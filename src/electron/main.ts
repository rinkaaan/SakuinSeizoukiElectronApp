import { BrowserWindow } from "electron"
import portFinder from "portfinder"
import { Channels } from "./types"

export async function initWindow(window: BrowserWindow) {
  let flaskPort: number
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    flaskPort = 34200
  } else {
    flaskPort = await portFinder.getPortPromise()
  }
  window.webContents.send(Channels.onEnginePort, flaskPort)
}
