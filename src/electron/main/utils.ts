import { BrowserWindow } from "electron"
import portFinder from "portfinder"
import { Channels } from "../renderer/types"

export async function sendFreePort() {
  const window = BrowserWindow.getFocusedWindow()
  let flaskPort: number
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    flaskPort = 34200
  } else {
    flaskPort = await portFinder.getPortPromise()
    flaskPort = 34200
  }
  window.webContents.send(Channels.onEnginePort, flaskPort)
}
