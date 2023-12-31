import { Provider } from "react-redux"
import store from "./store"
import { createHashRouter, RouterProvider } from "react-router-dom"

export function withStore(Story) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}

export function withRouter(Story) {
  const router = createHashRouter([
    {
      path: "/",
      element: <Story />,
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}
