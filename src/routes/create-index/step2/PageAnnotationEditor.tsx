import { AppLayout, Button, HelpPanel, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useState } from "react"
import PageAnnotationCanvas from "./PageAnnotationCanvas"
import { currentPageTypeAnnotationTotalGroupsSelector, disableNewGroupButtonSelector, LoadPageType, newProjectActions, newProjectSelector } from "../newProjectSlice"
import { useHotkeys } from "react-hotkeys-hook"
import GoToPageModal from "./GoToPageModal"
import { appDispatch } from "../../../common/store"
import { useSelector } from "react-redux"

export default function PageAnnotationEditor({
  isOpen,
  imageUrl,
  onClose,
  onGetNextPage,
  onGetPreviousPage,
  onGetSpecificPage,
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
  onGetSpecificPage: (pageNumber: number) => void,
  isFinished: boolean,
  toggleFinishPageType: () => void,
  samplePageIndex: number,
  totalSamplePages: number,
}) {
  const [toolsOpen, setToolsOpen] = useState(true)
  const [loadingButton, setLoadingButton] = useState<LoadPageType | false>(false)
  const [goToPageModalOpen, setGoToPageModalOpen] = useState(false)
  const { currentColor } = useSelector(newProjectSelector)
  const totalGroups = useSelector(currentPageTypeAnnotationTotalGroupsSelector)
  const disableNewGroup = useSelector(disableNewGroupButtonSelector)
  useHotkeys("esc", onClose)
  useHotkeys(["right", "j"], () => onGetNextPage())
  useHotkeys(["left", "k"], () => onGetPreviousPage())

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
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 3000 }}>
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
              <Button
                iconName="angle-right-double"
                ariaLabel="Go to page"
                onClick={() => setGoToPageModalOpen(true)}
              >
                Go to page
              </Button>
              {/*<SpaceBetween size="m" direction="horizontal">*/}
              {/*  <Button*/}
              {/*    iconName="undo"*/}
              {/*    ariaLabel="Undo"*/}
              {/*  >*/}
              {/*    Undo*/}
              {/*  </Button>*/}
              {/*  <Button*/}
              {/*    iconName="redo"*/}
              {/*    ariaLabel="Redo"*/}
              {/*  >*/}
              {/*    Redo*/}
              {/*  </Button>*/}
              {/*</SpaceBetween>*/}
              <SpaceBetween size="s" direction="horizontal" alignItems="center">
                <TextContent>Group {totalGroups}</TextContent>
                <div
                  style={{
                    backgroundColor: currentColor,
                    height: "30px",
                    width: "30px",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    appDispatch(newProjectActions.refreshColor())
                  }}
                />
              </SpaceBetween>
              <Button
                iconName="add-plus"
                ariaLabel="New group"
                onClick={() => appDispatch(newProjectActions.incrementPageTypeAnnotationTotalGroups())}
                disabled={disableNewGroup}
              >
                New group
              </Button>
              <Button
                iconName="close"
                ariaLabel="Clear annotations"
                onClick={() => {
                  appDispatch(newProjectActions.clearPageTypeAnnotations())
                }}
              >
                Clear annotations
              </Button>
            </SpaceBetween>
          </HelpPanel>
        }
      />
      <GoToPageModal
        onGetSpecificPage={onGetSpecificPage}
        open={goToPageModalOpen}
        onClose={() => setGoToPageModalOpen(false)}
      />
    </div>
)
}
