import type { Meta, StoryObj } from "@storybook/react"
import { DownloadIndexButton } from "./DownloadIndexButton"
import { withStore } from "../../../common/storybookUtils"
import { appDispatch } from "../../../common/store"
import { newProjectActions } from "../newProjectSlice"
import data from "./data.json"
import { provideStoreLoaders } from "../../../common/storybookTypedUtils"

const meta: Meta<typeof DownloadIndexButton> = {
  title: "DownloadIndexButton",
  component: DownloadIndexButton,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof DownloadIndexButton>;

export const Default: Story = {
  decorators: [withStore],
  loaders: provideStoreLoaders(async () => {
    appDispatch(newProjectActions.updateSlice({
      createIndexOut: data,
    }))
  }),
}
