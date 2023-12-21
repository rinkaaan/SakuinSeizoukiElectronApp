import type { Meta, StoryObj } from "@storybook/react"
import PageAnnotationEditor from "../routes/projects/new-project/PageAnnotationEditor"

const meta: Meta<typeof PageAnnotationEditor> = {
  title: "PageAnnotationEditor",
  component: PageAnnotationEditor,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    imageUrl: "http://localhost:34200/project/get/pdf/page?pdf_path=%2FUsers%2Fnguylinc%2FDownloads%2Fjp%20book.pdf&page_number=34",
    isOpen: true,
  },
}

export default meta
type Story = StoryObj<typeof PageAnnotationEditor>;

export const Primary: Story = {}
