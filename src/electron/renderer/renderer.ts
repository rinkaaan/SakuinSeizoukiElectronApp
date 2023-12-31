import { RendererElectron } from "./preload"
import { OpenAPI } from "../../../openapi-client"
import { socketManager } from "../../common/clients"

export async function initElectron(electron: RendererElectron) {
  electron.onEnginePort(port => {
    localStorage.setItem("engine-port", port.toString())
    OpenAPI.BASE = `http://127.0.0.1:${port}`
    socketManager.connect(port)
  })
}
