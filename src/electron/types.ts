export interface RendererElectron {
  onEnginePort: (callback: (port: number) => void) => void;
}

export const Channels = {
  onEnginePort: "engine:port"
}
