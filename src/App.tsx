import { createHashRouter, RouterProvider } from "react-router-dom"
import { commonSlice } from "./slices/commonSlice"
import MainLayout from "./routes/MainLayout"

const router = createHashRouter([
  {
    path: "/",
    Component: MainLayout,
    loader: async () => {
      await commonSlice.initAppDataDirectory()
      return null
    },
    children: [
      {
        path: "settings",
        lazy: () => import("./routes/SettingsRoute"),
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
