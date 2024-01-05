import { AppLayout, Button, HelpPanel, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useState } from "react"
import PageAnnotationCanvas from "./PageAnnotationCanvas"
import { currentPageTypeAnnotationTotalGroupsSelector, disableNewGroupButtonSelector, disableRefreshColorSelector, LoadPageType, createIndexActions, createIndexSelector } from "../createIndexSlice"
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
  const { currentColor } = useSelector(createIndexSelector)
  const totalGroups = useSelector(currentPageTypeAnnotationTotalGroupsSelector)
  const disableNewGroup = useSelector(disableNewGroupButtonSelector)
  const disableRefreshColor = useSelector(disableRefreshColorSelector)
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
            // header={<h2>Annotation Editor</h2>}
            header={<h2>注釈エディター</h2>}
            footer={
              <SpaceBetween
                size="s"
                direction="horizontal"
              >
                {/*<Button onClick={onClose}>Close</Button>*/}
                <Button onClick={onClose}>閉じる</Button>
                <Button
                  variant="primary"
                  onClick={toggleFinishPageType}
                >
                  {/*{isFinished ? "Unfinish" : "Finish"}*/}
                  {isFinished ? "未完了" : "完了"}
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {/*<TextContent>Page {samplePageIndex + 1} of {totalSamplePages}</TextContent>*/}
              <TextContent>ページ {samplePageIndex + 1} / {totalSamplePages}</TextContent>
              <Button
                iconName="angle-left"
                // ariaLabel="Previous page"
                ariaLabel="前のページ"
                onClick={() => onGetPage("previous")}
                loading={loadingButton === "previous"}
                disabled={samplePageIndex === 0}
              >
                {/*Previous page*/}
                前のページ
              </Button>
              <Button
                iconName="angle-right"
                // ariaLabel="Next page"
                ariaLabel="次のページ"
                onClick={() => onGetPage("next")}
                loading={loadingButton === "next"}
                disabled={samplePageIndex === totalSamplePages - 1}
              >
                {/*Next page*/}
                次のページ
              </Button>
              <Button
                iconName="angle-right-double"
                // ariaLabel="Go to page"
                ariaLabel="ページへ移動"
                onClick={() => setGoToPageModalOpen(true)}
              >
                {/*Go to page*/}
                ページへ移動
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
                {/*<TextContent>Group {totalGroups}</TextContent>*/}
                <TextContent>グループ {totalGroups}</TextContent>
                <div
                  style={{
                    backgroundColor: currentColor,
                    height: "30px",
                    width: "30px",
                    borderRadius: "3px",
                    cursor: disableRefreshColor ? "not-allowed" : "pointer",
                    pointerEvents: disableRefreshColor ? "none" : "auto",
                  }}
                  onClick={() => {
                    appDispatch(createIndexActions.refreshColor())
                  }}
                />
              </SpaceBetween>
              <Button
                iconName="add-plus"
                // ariaLabel="New group"
                ariaLabel="新しいグループ"
                onClick={() => appDispatch(createIndexActions.incrementPageTypeAnnotationTotalGroups())}
                disabled={disableNewGroup}
              >
                {/*New group*/}
                新しいグループ
              </Button>
              <Button
                iconName="close"
                // ariaLabel="Clear annotations"
                ariaLabel="注釈をクリア"
                onClick={() => {
                  appDispatch(createIndexActions.clearPageTypeAnnotations())
                }}
              >
                {/*Clear annotations*/}
                注釈をクリア
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
