import { AppLayout, Button, HelpPanel, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useState } from "react"
import PageAnnotationCanvas from "./PageAnnotationCanvas"
import { LoadPageType } from "../newProjectSlice"
import { useHotkeys } from "react-hotkeys-hook"

export default function PageAnnotationEditor({
  isOpen,
  imageUrl,
  onClose,
  onGetNextPage,
  onGetPreviousPage,
  isFinished,
  toggleFinishPageType,
  samplePageIndex,
  totalSamplePages,
}: {
  isOpen: boolean,
  imageUrl: string,
  onClose: () => void,
  onGetNextPage: () => void,
  onGetPreviousPage: () => void,
  isFinished: boolean,
  toggleFinishPageType: () => void,
  samplePageIndex: number,
  totalSamplePages: number,
}) {
  const [toolsOpen, setToolsOpen] = useState(true)
  const [loadingButton, setLoadingButton] = useState<LoadPageType | false>(false)
  useHotkeys("esc", onClose)

  if (!isOpen) return null

  function onGetPage(type: LoadPageType) {
    switch (type) {
      case "next":
        setLoadingButton("next")
        onGetNextPage()
        break
      case "previous":
        setLoadingButton("previous")
        onGetPreviousPage()
        break
    }
  }

  function setLoading(loading: boolean) {
    if (!loading) {
      setLoadingButton(false)
    }
  }

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9000 }}>
      <AppLayout
        content={<PageAnnotationCanvas imageUrl={imageUrl} setLoading={setLoading} />}
        navigationHide
        toolsOpen={toolsOpen}
        onToolsChange={(e) => {
          setToolsOpen(e.detail.open)
        }}
        tools={
          <HelpPanel
            header={<h2>Annotation Editor</h2>}
            footer={
              <SpaceBetween
                size="s"
                direction="horizontal"
              >
                <Button onClick={onClose}>Close</Button>
                <Button
                  variant="primary"
                  onClick={toggleFinishPageType}
                >
                  {isFinished ? "Unfinish" : "Finish"}
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              <TextContent>Page {samplePageIndex + 1} of {totalSamplePages}</TextContent>
              <SpaceBetween size="l">
                <Button
                  iconName="angle-left"
                  ariaLabel="Previous page"
                  onClick={() => onGetPage("previous")}
                  loading={loadingButton === "previous"}
                  disabled={samplePageIndex === 0}
                >
                  Previous page
                </Button>
                <Button
                  iconName="angle-right"
                  ariaLabel="Next page"
                  onClick={() => onGetPage("next")}
                  loading={loadingButton === "next"}
                  disabled={samplePageIndex === totalSamplePages - 1}
                >
                  Next page
                </Button>
              </SpaceBetween>
              <SpaceBetween size="m" direction="horizontal">
                <Button
                  iconName="undo"
                  ariaLabel="Undo"
                >
                  Undo
                </Button>
                <Button
                  iconName="redo"
                  ariaLabel="Redo"
                >
                  Redo
                </Button>
              </SpaceBetween>
            </SpaceBetween>
          </HelpPanel>
        }
      />
    </div>
  )
}
