import { initElectron } from "./electron/renderer"
import { RendererElectron } from "./electron/types"

declare global {
  interface Window {
    electron: RendererElectron;
  }
}

initElectron(window.electron)

import "./Main"
