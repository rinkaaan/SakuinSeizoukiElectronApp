import { appDispatch } from "./store"
import { mainActions } from "../routes/mainSlice"

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
