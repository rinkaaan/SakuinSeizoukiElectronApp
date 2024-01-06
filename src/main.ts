import { app, BrowserWindow } from "electron"
import path from "path"
import { initMain } from "./electron/main/main"
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer"
import { isDev } from "./electron/main/utils"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit()
}

let mainWindow: BrowserWindow | null = null

async function createWindow() {
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await installExtension(
      [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS],
      { loadExtensionOptions: { allowFileAccess: true } }
    )
  }
  // await installExtension(
  //   [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS],
  //   { loadExtensionOptions: { allowFileAccess: true } }
  // )

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })
  if (!isDev()) {
    mainWindow.removeMenu()
  }
  mainWindow.maximize()
  mainWindow.show()

  // and load the index.html of the app.
  if (isDev()) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    await mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  await initMain()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
  app.on("window-all-closed", () => {
    app.quit()
  })
  app.on("ready", createWindow)
}
