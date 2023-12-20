import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@cloudscape-design/components"

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    iconName: "download",
    children: "Button",
  },
}

export default meta
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    ariaLabel: "Button",
  },
}

export const Secondary: Story = {
  args: {
    ariaLabel: "Button",
  },
}
