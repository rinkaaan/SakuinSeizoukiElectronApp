import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <h1>Hello world!</h1>
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
