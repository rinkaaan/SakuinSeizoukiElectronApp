// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron"
import { rendererElectron } from "./electron/renderer/preload"

// Converts sending and receiving of IPC messages into an API usable by the renderer process.
contextBridge.exposeInMainWorld("electron", rendererElectron)
