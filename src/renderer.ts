import { initElectron } from "./electron/renderer/renderer"
import { RendererElectron } from "./electron/renderer/preload"

declare global {
  interface Window {
    electron: RendererElectron;
  }
}

async function main() {
  await initElectron(window.electron)
  import("./Root")
}

main()
