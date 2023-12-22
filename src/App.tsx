import { createHashRouter, Outlet, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout"
import MainLayoutError from "./routes/MainLayoutError"
import { appDispatch } from "./common/store"
import { mainSelector, initApp } from "./slices/mainSlice"
import { useSelector } from "react-redux"

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
        path: "projects",
        Component: Outlet,
        handle: createCrumb("Projects", "/projects/all"),
        children: [
          {
            path: "new",
            lazy: () => import("./routes/projects/new-project/NewProjectRoute"),
            handle: createCrumb("New Project", "/projects/new"),
          },
          {
            path: "all",
            lazy: () => import("./routes/projects/all-projects/AllProjectsRoute"),
          },
        ],
      },
      {
        path: "settings",
        lazy: () => import("./routes/settings/SettingsRoute"),
        handle: createCrumb("Settings", "/settings"),
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
