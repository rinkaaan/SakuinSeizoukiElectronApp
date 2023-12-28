import { createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout"
import MainLayoutError from "./routes/MainLayoutError"
import { appDispatch } from "./common/store"
import { initApp, mainSelector } from "./routes/mainSlice"
import { useSelector } from "react-redux"
import "@cloudscape-design/global-styles/index.css"
import "./root.css"
import { newProjectActions } from "./routes/create-index/newProjectSlice"
import { useEffect } from "react"

const router = createHashRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <MainLayoutError/>,
    loader: async () => {
      await appDispatch(initApp())
      return null
    },
    children: [
      {
        path: "create-index",
        lazy: () => import("./routes/create-index/CreateIndexRoute"),
        handle: createCrumb("Create Index", "/create-index"),
      },
      {
        path: "settings",
        lazy: () => import("./routes/settings/SettingsRoute"),
        handle: createCrumb("Settings", "/settings"),
      },
      {
        path: "reset",
        Component: () => {
          useEffect(() => {
            appDispatch(newProjectActions.resetSlice())
          }, [])

          return <Navigate to="/create-index"/>
        }
      }
    ],
  },
])

export interface CrumbHandle {
  crumbs: () => { crumb: string, path: string }
}

function createCrumb(crumb: string, path: string): CrumbHandle {
  return {
    crumbs: () => {
      return {
        crumb,
        path,
      }
    }
  }
}

export default function App() {
  const { lockScroll } = useSelector(mainSelector)

  return (
    <div style={lockScroll ? { height: "100%", position: "absolute", width: "100%", overflow: "hidden" } : {}}>
      <RouterProvider router={router}/>
    </div>
  )
}
