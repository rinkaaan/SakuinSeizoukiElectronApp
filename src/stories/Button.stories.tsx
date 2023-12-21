import type { Meta, StoryObj } from "@storybook/react"
import PageAnnotationCanvas from "../routes/projects/new-project/PageAnnotationCanvas"

const meta: Meta<typeof PageAnnotationCanvas> = {
  title: "Example/Button",
  component: PageAnnotationCanvas,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof PageAnnotationCanvas>;

export const Primary: Story = {}
