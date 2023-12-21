import React, { Fragment } from "react"
import { Box, Cards, Icon, Link, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import { getPage } from "../stepsUtils"
import PageAnnotationEditor from "../PageAnnotationEditor"
import { appDispatch } from "../../../../common/store"


export function Step2() {
  const { selectedPageTypeIndex, openPdfOut, pageTypeSamplePages, pageAnnotationEditorOpen, annotationEditorPageUrl, finishedPageTypes } = useSelector(newProjectSelector)

  return (
    <Fragment>
      <Box margin={{ bottom: "l" }}>
        <SpaceBetween size="m">
          <TextContent>
            <p>Annotate the text and page number regions for each PDF page type.</p>
          </TextContent>
          <Cards
            cardDefinition={{
              header: item => (
                <SpaceBetween size="xs" direction="horizontal" alignItems="end">
                  <Link
                    href="#"
                    onFollow={(e) => {
                      e.preventDefault()
                      appDispatch(newProjectActions.openAnnotationEditor(item.type))
                    }}
                    fontSize="heading-m"
                  >
                    {`Type ${item.type + 1}`}
                  </Link>
                  {finishedPageTypes[item.type] && <Icon variant="success" size="medium" name="status-positive" />}
                </SpaceBetween>
              ),
              sections: [
                {
                  header: "Total pages",
                  content: item => item.page_numbers.length,
                  width: 33,
                },
                {
                  header: "Page width",
                  content: item => `${item.width} px`,
                  width: 33,
                },
                {
                  header: "Page height",
                  content: item => `${item.height} px`,
                  width: 33,
                },
                {
                  header: "Sample page",
                  content: item => <img
                    src={getPage(pageTypeSamplePages[item.type])}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />,
                },
              ],
            }}
            items={openPdfOut.page_types}
          />
        </SpaceBetween>
      </Box>
      <PageAnnotationEditor
        isOpen={pageAnnotationEditorOpen}
        imageUrl={annotationEditorPageUrl}
        onGetNextPage={() => {
          appDispatch(newProjectActions.getSamplePage("next"))
        }}
        onGetPreviousPage={() => {
          appDispatch(newProjectActions.getSamplePage("previous"))
        }}
        toggleFinishPageType={() => {
          appDispatch(newProjectActions.toggleFinishPageType())
        }}
        isFinished={finishedPageTypes[selectedPageTypeIndex]}
        onClose={() => {
          appDispatch(newProjectActions.closeAnnotationEditor())
        }}
        samplePageIndex={openPdfOut.page_types[selectedPageTypeIndex].page_numbers.indexOf(pageTypeSamplePages[selectedPageTypeIndex])}
        totalSamplePages={openPdfOut.page_types[selectedPageTypeIndex].page_numbers.length}
      />
    </Fragment>
  )
}
