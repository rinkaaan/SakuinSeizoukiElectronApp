import type { Meta, StoryObj } from "@storybook/react"
import { Step4 } from "./Step4"
import { provideStoreLoaders, withStore } from "../../../common/storybookUtils"
import { appDispatch } from "../../../common/store"
import { newProjectActions } from "../newProjectSlice"
import data from "./data.json"

const meta: Meta<typeof Step4> = {
  title: "Step4",
  component: Step4,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof Step4>;

export const Default: Story = {
  decorators: [withStore],
  loaders: provideStoreLoaders(async () => {
    appDispatch(newProjectActions.updateSlice({
      createIndexOut: data,
    }))
  }),
}
