import React, { Fragment } from "react"
import { Alert, Box, Cards, Icon, Link, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../newProjectSlice"
import PageAnnotationEditor from "./PageAnnotationEditor"
import { getPage } from "../stepsUtils"
import store, { appDispatch } from "../../../common/store"


export function Step2() {
  const { selectedPageTypeIndex, openPdfOut, pageTypeSampleIndex, pageAnnotationEditorOpen, annotationEditorPageUrl, finishedPageTypes, pdfFile, errorMessages } = useSelector(newProjectSelector)

  function getThumbnailUrl(pageTypeIndex: number) {
    const pageNumber = openPdfOut.page_types[pageTypeIndex].page_numbers[pageTypeSampleIndex[pageTypeIndex]]
    return getPage({ pageNumber, pdfPath: pdfFile.path })
  }

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
                    src={getThumbnailUrl(item.type)}
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
          {errorMessages["pageTypes"] && (
            <Alert type="warning">
              {errorMessages["pageTypes"]}
            </Alert>
          )}
          {/*<Alert type="warning">*/}
          {/*  Please mark all page types as finished before continuing.*/}
          {/*</Alert>*/}
        </SpaceBetween>
      </Box>
      <PageAnnotationEditor
        isOpen={pageAnnotationEditorOpen}
        imageUrl={annotationEditorPageUrl}
        onGetNextPage={() => {
          appDispatch(newProjectActions.updateSamplePage("next"))
        }}
        onGetPreviousPage={() => {
          appDispatch(newProjectActions.updateSamplePage("previous"))
        }}
        onGetSpecificPage={(pageNumber) => {
          appDispatch(newProjectActions.updateSamplePage(pageNumber))
        }}
        toggleFinishPageType={() => {
          appDispatch(newProjectActions.toggleFinishPageType())
        }}
        isFinished={finishedPageTypes[selectedPageTypeIndex]}
        onClose={() => {
          appDispatch(newProjectActions.closeAnnotationEditor())
        }}
        samplePageIndex={pageTypeSampleIndex[selectedPageTypeIndex]}
        totalSamplePages={openPdfOut.page_types[selectedPageTypeIndex].page_numbers.length}
      />
    </Fragment>
  )
}

export async function validateStep2() {
  appDispatch(newProjectActions.clearErrorMessages())
  const { finishedPageTypes, openPdfOut } = store.getState().newProject
  let isValid = true

  if (Object.values(finishedPageTypes).filter(Boolean).length !== openPdfOut.page_types.length) {
    console.debug("Please mark all page types as finished before continuing.")
    appDispatch(newProjectActions.addErrorMessage({
      key: "pageTypes",
      message: "Please mark all page types as finished before continuing.",
    }))
    isValid = false
  }

  return isValid
}
