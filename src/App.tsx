import { createHashRouter, RouterProvider } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    lazy: () => import("./routes/Home"),
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
