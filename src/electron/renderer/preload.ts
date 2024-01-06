import { ipcRenderer } from "electron"


import { Channels } from "./types"

export interface RendererElectron {
  onEnginePort: (callback: (port: number) => void) => void;
  selectDir: () => Promise<string | null>;
  selectPdf: () => Promise<string | null>;
  downloadFile: (filename: string, title: string, extensionName: string, extensions: string[]) => Promise<string | null>;
}

export const rendererElectron: RendererElectron = {
  onEnginePort,
  selectDir,
  selectPdf,
  downloadFile,
}

function onEnginePort(callback: (port: number) => void) {
  ipcRenderer.on(Channels.onEnginePort, (_event, port) => callback(port))
}

async function selectDir(): Promise<string | null> {
  return ipcRenderer.invoke(Channels.selectDir)
}

async function selectPdf(): Promise<string | null> {
  return ipcRenderer.invoke(Channels.selectPdf)
}

async function downloadFile(filename: string, title: string, extensionName: string, extensions: string[]): Promise<string | null> {
  return ipcRenderer.invoke(Channels.downloadFile, filename, title, extensionName, extensions)
}
