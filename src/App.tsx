import { createHashRouter, Outlet, RouterProvider } from "react-router-dom"
import { commonSlice } from "./slices/commonSlice"
import MainLayout from "./routes/MainLayout"
import MainLayoutError from "./routes/MainLayoutError.jsx"

const router = createHashRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <MainLayoutError/>,
    loader: async () => {
      await commonSlice.initAppDataDirectory()
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
            handle: createCrumb("New Project", "/projects/new-project"),
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

function createCrumb(crumb: string, path: string) {
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
  return <RouterProvider router={router}/>
}
