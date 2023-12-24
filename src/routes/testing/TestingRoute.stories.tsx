import type { Meta, StoryObj } from "@storybook/react"
import { Component } from "./TestingRoute"
import { Provider } from "react-redux"
import testingStore, { testingDispatch } from "./testingStore"
import { withRouter } from "storybook-addon-react-router-v6"
import { testingActions } from "./testingSlice"

const meta: Meta<typeof Component> = {
  title: "TestingRoute",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof Component>;

export const Primary: Story = {
  decorators: [
    withStore,
    withRouter,
  ],
  loaders: provideStoreLoaders(async () => {
    testingDispatch(testingActions.updateSlice({
      appDataDirectory: "/Users/nguylinc/Desktop/test",
    }))
  }),
}

export const Secondary: Story = {
  decorators: [
    withStore,
    withRouter,
  ],
  loaders: provideStoreLoaders(),
}

function provideStoreLoaders(loader?: () => Promise<void>) {
  const loaders = [
    async () => {
      testingDispatch(testingActions.resetSlice())
    },
  ]
  if (loader) {
    loaders.push(loader)
  }
  return loaders
}

function withStore(Story: any) {
  return (
    <Provider store={testingStore}>
      <Story />
    </Provider>
  )
}
