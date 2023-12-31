import type { Meta, StoryObj } from "@storybook/react"
import { appDispatch } from "../../common/store"
import { mainActions } from "../mainSlice"
import App from "../../App"
import { withStore } from "../../common/storybookUtils"
import { provideStoreLoaders } from "../../common/storybookTypedUtils"

const meta: Meta<typeof App> = {
  title: "CreateIndexRoute",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof App>;

export const Default: Story = {
  decorators: [withStore],
  loaders: provideStoreLoaders(async () => {
    appDispatch(mainActions.updateSlice({
      startingPath: "/create-index",
    }))
  }),
}
