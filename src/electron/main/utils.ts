import { BrowserWindow } from "electron"
import portFinder from "portfinder"
import { Channels } from "../renderer/types"
import { spawn } from "node:child_process"
import kill from "tree-kill"
import { engineManager } from "./main"
import path from "node:path"
import process from "node:process"

export function isDev() {
  return MAIN_WINDOW_VITE_DEV_SERVER_URL !== undefined
}

export async function sendFreePort() {
  const window = BrowserWindow.getFocusedWindow()
  let flaskPort: number
  if (isDev()) {
    // flaskPort = await portFinder.getPortPromise()
    // engineManager.initEngine(flaskPort)
    flaskPort = 34200
  } else {
    flaskPort = await portFinder.getPortPromise()
    engineManager.initEngine(flaskPort)
    // flaskPort = 34200
  }
  window.webContents.send(Channels.onEnginePort, flaskPort)
}

export class EngineManager {
  private app: Electron.App

  constructor(app: Electron.App) {
    this.app = app
  }

  initEngine(port: number) {
    let enginePath: string
    if (isDev()) {
      enginePath = path.join(process.cwd(), "binaries", "engine.exe")
    } else {
      enginePath = path.join(process.resourcesPath, "engine.exe")
    }
    const engine = spawn(enginePath, [`${port}`], { detached: true })
    engine.stdout?.on("data", (data) => {
      console.info(`engine stdout: ${data}`)
    })
    engine.stderr?.on("data", (data) => {
      console.error(`engine stderr: ${data}`)
    })
    this.app.on("before-quit", () => {
      kill(engine.pid, "SIGTERM", (err) => {
        if (err) {
          console.error(err)
        } else {
          console.info("engine killed")
        }
      })
    })
  }
}
