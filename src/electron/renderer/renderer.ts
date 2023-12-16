import { RendererElectron } from "./preload"
import { OpenAPI } from "../../../openapi-client"

export async function initElectron(electron: RendererElectron) {
  electron.onEnginePort(port => {
    console.log("Engine port:", port)
    localStorage.setItem("engine-port", port.toString())
    OpenAPI.BASE = `http://127.0.0.1:${port}`
  })
}
