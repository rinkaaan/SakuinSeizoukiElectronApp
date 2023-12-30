import store, { appDispatch } from "./store"
import { mainActions } from "../routes/mainSlice"
import { Provider } from "react-redux"
import { createHashRouter, RouterProvider } from "react-router-dom"

export function provideStoreLoaders(loader?: () => Promise<void>) {
  const loaders = [
    async () => {
      appDispatch(mainActions.resetSlice())
      appDispatch(mainActions.updateSlice({
        engineReady: true,
      }))
    },
  ]
  if (loader) {
    loaders.push(loader)
  }
  return loaders
}

export function withStore(Story: any) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}

export function withRouter(Story: any) {
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
