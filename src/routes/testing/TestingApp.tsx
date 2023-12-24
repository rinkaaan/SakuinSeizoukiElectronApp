import { createHashRouter, Outlet, RouterProvider } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    Component: Outlet,
    children: [
      {
        path: "testing",
        lazy: () => import("./TestingRoute"),
      },
    ],
  },
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
