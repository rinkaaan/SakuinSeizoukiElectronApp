import { ipcRenderer } from "electron"


import { Channels } from "./types"

export interface RendererElectron {
  onEnginePort: (callback: (port: number) => void) => void;
  selectDir: () => Promise<string | null>;
}

export const rendererElectron: RendererElectron = {
  onEnginePort,
  selectDir,
}

function onEnginePort(callback: (port: number) => void) {
  ipcRenderer.on(Channels.onEnginePort, (_event, port) => callback(port))
}

async function selectDir(): Promise<string | null> {
  return ipcRenderer.invoke(Channels.selectDir)
}
