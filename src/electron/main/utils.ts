import { BrowserWindow } from "electron"
import portFinder from "portfinder"
import { Channels } from "../renderer/types"
import path from "path"
import { exec } from "child_process"
import { engineManager } from "./main"

export async function sendFreePort() {
  const window = BrowserWindow.getFocusedWindow()
  let flaskPort: number
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    flaskPort = 34200
  } else {
    flaskPort = await portFinder.getPortPromise()
    flaskPort = 34200
    engineManager.initEngine(flaskPort)
  }
  window.webContents.send(Channels.onEnginePort, flaskPort)
}

export class EngineManager {
  private app: Electron.App

  constructor(app: Electron.App) {
    this.app = app
  }

  initEngine(port: number) {
    const enginePath = path.join(process.resourcesPath, "engine")
    const engine = exec(`${enginePath} ${port}`)
    engine.stdout?.on("data", (data) => {
      console.log(`stdout: ${data}`)
    })
    engine.stderr?.on("data", (data) => {
      console.error(`stderr: ${data}`)
    })
    this.app.on("before-quit", () => {
      engine.kill()
    })
  }
}
