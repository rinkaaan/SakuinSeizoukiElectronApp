// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"
import { Channels } from "./electron/types"

// Converts sending and receiving of IPC messages into an API usable by the renderer process.
contextBridge.exposeInMainWorld("electron", {
  onEnginePort: (callback: (port: number) => void) => {
    ipcRenderer.on(Channels.onEnginePort, (_event, port) => callback(port))
  }
})
