import { AppLayout, Button, HelpPanel, SpaceBetween } from "@cloudscape-design/components"
import { useState } from "react"
import PageAnnotationCanvas from "./PageAnnotationCanvas"

export default function PageAnnotationEditor({
  imageUrl,
  isOpen
}: {
  imageUrl: string,
  isOpen: boolean,
}) {
  const [toolsOpen, setToolsOpen] = useState(true)

  if (!isOpen) return null
  return (
    <AppLayout
      content={<PageAnnotationCanvas imageUrl={imageUrl}/>}
      navigationHide
      toolsOpen={toolsOpen}
      onToolsChange={(e) => {
        setToolsOpen(e.detail.open)
      }}
      tools={
        <HelpPanel
          header={<h2>Annotation Editor</h2>}
          footer={
            <SpaceBetween size="s" direction="horizontal">
              <Button
                onClick={() => setToolsOpen(false)}
              >Cancel</Button>
              <Button variant="primary">Finish</Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Button iconName="refresh">Get new sample page</Button>
            <Button iconName="remove">Clear editor</Button>
          </SpaceBetween>
        </HelpPanel>
      }
    />
  )
}
