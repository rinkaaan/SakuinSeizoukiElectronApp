import type { Meta, StoryObj } from "@storybook/react"
import PageAnnotationEditor from "../routes/projects/new-project/PageAnnotationEditor"
import { getPage } from "../routes/projects/new-project/stepsUtils"

const meta: Meta<typeof PageAnnotationEditor> = {
  title: "PageAnnotationEditor",
  component: PageAnnotationEditor,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    imageUrl: getPage(),
    onClose: () => {},
    onGetNextPage: () => {},
    onGetPreviousPage: () => {},
    isFinished: false,
    toggleFinishPageType: () => {},
    samplePageIndex: 0,
    totalSamplePages: 3,
  },
}

export default meta
type Story = StoryObj<typeof PageAnnotationEditor>;

export const Primary: Story = {}
