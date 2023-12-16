import { ipcRenderer } from "electron"


import { Channels } from "./types"

export interface RendererElectron {
  onEnginePort: (callback: (port: number) => void) => void;
  sendAppDataDir: (dir: string) => void;
  selectDir: () => Promise<string | null>;
}

export const rendererElectron: RendererElectron = {
  onEnginePort,
  sendAppDataDir,
  selectDir,
}

function onEnginePort(callback: (port: number) => void) {
  ipcRenderer.on(Channels.onEnginePort, (_event, port) => callback(port))
}

function sendAppDataDir(dir: string) {
  ipcRenderer.send(Channels.sendAppDataDir, dir)
}

async function selectDir(): Promise<string | null> {
  return ipcRenderer.invoke(Channels.selectDir)
}
