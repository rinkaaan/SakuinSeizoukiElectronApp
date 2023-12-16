import { initElectron } from "./electron/renderer/renderer"
import { RendererElectron } from "./electron/renderer/preload"

declare global {
  interface Window {
    electron: RendererElectron;
  }
}

initElectron(window.electron)

import "./Main"
