import type { Meta, StoryObj } from "@storybook/react"
import PageAnnotationEditor from "./PageAnnotationEditor"
import { getPage } from "./stepsUtils"

const meta: Meta<typeof PageAnnotationEditor> = {
  title: "PageAnnotationEditor",
  component: PageAnnotationEditor,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    imageUrl: getPage({ pageNumber: 34, pdfPath: "/Users/nguylinc/Desktop/test.pdf", apiBase: "http://localhost:34200" }),
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
