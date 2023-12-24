import type { Meta, StoryObj } from "@storybook/react"
import { Provider } from "react-redux"
import store, { appDispatch } from "../../common/store"
import { mainActions } from "../mainSlice"
import App from "../../App"

const meta: Meta<typeof App> = {
  title: "SettingsRoute",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof App>;

export const Primary: Story = {
  decorators: [
    withStore,
  ],
  loaders: provideStoreLoaders(async () => {
    appDispatch(mainActions.updateSlice({
      appDataDirectory: "/Users/nguylinc/Desktop/test",
    }))
  }),
}

export const Secondary: Story = {
  decorators: [
    withStore,
  ],
  loaders: provideStoreLoaders(),
}

function provideStoreLoaders(loader?: () => Promise<void>) {
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

function withStore(Story: any) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}
