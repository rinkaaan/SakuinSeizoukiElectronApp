import { createHashRouter, RouterProvider } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    Component: () => <h1>Hello world!</h1>
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
