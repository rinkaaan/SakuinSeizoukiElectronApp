import type { ForgeConfig } from "@electron-forge/shared-types"
import { MakerSquirrel } from "@electron-forge/maker-squirrel"
import { VitePlugin } from "@electron-forge/plugin-vite"
import MakerZIP from "@electron-forge/maker-zip"

let extraResource: string[] = []

if (process.platform === "win32") {
  extraResource = ["binaries/engine.exe"]
} else {
  extraResource = ["binaries/engine"]
}

const config: ForgeConfig = {
  packagerConfig: {
    extraResource,
    icon: "src/assets/Icon",
    name: "SakuinSeizouki",
    executableName: "SakuinSeizouki",
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupExe: "SakuinSeizouki Installer.exe",
      name: "SakuinSeizouki",
      iconUrl: "https://raw.githubusercontent.com/rinkaaan/SakuinSeizoukiElectronApp/4a73f403e465a3bd636db48dee8241b1523323d1/src/assets/Icon.ico",
      setupIcon: "./src/assets/Installer.ico",
      description: "Create an index for a PDF file",
      loadingGif: "./src/assets/Loading.gif",
      version: "1.0.0",
      authors: "Lincoln Nguyen",
      exe: "SakuinSeizouki.exe",
      noMsi: true,
    }),
    new MakerZIP({}, ["darwin"]),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
}

export default config
