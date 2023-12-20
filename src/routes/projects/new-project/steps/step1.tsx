import React from "react"
import { Alert, Box, Container, FileUpload, FormField, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import store, { appDispatch } from "../../../../common/store"
import { OpenAPI, ProjectService } from "../../../../../openapi-client"

export function Step1() {
  const { pdfFile, missingPdf, pageImage } = useSelector(newProjectSelector)

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Container>
          <SpaceBetween size="s">
            {/*<Form method="POST">*/}
            {/*  <CloudButton disabled={latestStepIndex !== 0} formAction="submit">Select file</CloudButton>*/}
            {/*  <input type="hidden" name="action" value="open-pdf"/>*/}
            {/*</Form>*/}
            <FormField>
              <FileUpload
                onChange={({ detail }) => {
                  if (!detail.value.length) {
                    appDispatch(newProjectActions.updateSlice({ pdfFile: undefined, pageImage: undefined }))
                    return
                  } else {
                    const pdfFile = detail.value[0]
                    const pageImage = `${OpenAPI.BASE}/project/get/pdf/page?pdf_path=${encodeURIComponent(pdfFile.path)}&page_number=1`
                    appDispatch(newProjectActions.updateSlice({ pdfFile, pageImage }))
                  }
                }}
                value={pdfFile ? [pdfFile] : []}
                i18nStrings={{
                  uploadButtonText: e =>
                    e ? "Choose files" : "Choose file",
                  dropzoneText: e =>
                    e
                      ? "Drop files to upload"
                      : "Drop file to upload",
                  removeFileAriaLabel: e =>
                    `Remove file ${e + 1}`,
                  limitShowFewer: "Show fewer files",
                  limitShowMore: "Show more files",
                  errorIconAriaLabel: "Error"
                }}
                showFileSize
                showFileThumbnail
                constraintText="Select one PDF file"
                accept="application/pdf"
              />
            </FormField>
            {missingPdf && !pdfFile && (
              <Alert type="warning">
                No file selected. Please select a file to continue.
              </Alert>
            )}
          </SpaceBetween>
        </Container>
        {pageImage && (
          <Container>
            <img
              src={pageImage}
              alt="PDF preview"
              style={{
                maxHeight: "1000px",
                maxWidth: "100%"
              }}
            />
          </Container>
        )}
      </SpaceBetween>
    </Box>
  )
}

export async function validateStep1() {
  const { pdfFile } = store.getState().newProject
  if (!pdfFile) {
    appDispatch(newProjectActions.updateSlice({ missingPdf: true }))
    return false
  }
  const openPdfOut = await ProjectService.postProjectNewPdf({ pdf_path: pdfFile.path })
  console.log(openPdfOut)
  appDispatch(newProjectActions.updateSlice({ openPdfOut, pdfFile }))
  return true
}
