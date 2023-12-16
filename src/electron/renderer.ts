import { RendererElectron } from "./types"

export async function initElectron(electron: RendererElectron) {
  electron.onEnginePort(port => {
    console.log("Engine port:", port)
  })
}
