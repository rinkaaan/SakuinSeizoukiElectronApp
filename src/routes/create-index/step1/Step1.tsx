import React from "react"
import { Box, Container, FileUploadProps, FormField, Header, NonCancelableCustomEvent, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector, openPdf } from "../newProjectSlice"
import store, { appDispatch } from "../../../common/store"
import { OpenAPI } from "../../../../openapi-client"
import CloudFileUpload from "../../../components/CloudFileUpload"

export function Step1() {
  const { pdfFile, errorMessages, pageImage, latestStepIndex } = useSelector(newProjectSelector)

  function onChange({ detail }: NonCancelableCustomEvent<FileUploadProps.ChangeDetail>) {
    appDispatch(newProjectActions.clearErrorMessages())
    if (!detail.value.length) {
      appDispatch(newProjectActions.updateSlice({ pdfFile: undefined, pageImage: undefined }))
      return
    } else {
      const pdfFile = detail.value[0]
      if (!pdfFile) return
      const pageImage = `${OpenAPI.BASE}/project/get/pdf/page?pdf_path=${encodeURIComponent(pdfFile.path)}&page_number=1`
      appDispatch(newProjectActions.updateSlice({ pdfFile, pageImage }))
    }
  }

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Container header={<Header>Select a PDF file</Header>}>
          <SpaceBetween size="s">
            <FormField>
              <CloudFileUpload
                errorText={errorMessages["pdfFile"]}
                disabled={latestStepIndex !== 0}
                onChange={onChange}
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
                constraintText="You can also drag and drop the file here"
                accept=".pdf"
              />
            </FormField>
          </SpaceBetween>
        </Container>
        {pageImage && (
          <Container header={<Header>PDF preview</Header>}>
            <img
              src={pageImage}
              alt="PDF preview"
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
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
  let isValid = true

  if (!pdfFile) {
    appDispatch(newProjectActions.addMissingErrorMessage("pdfFile"))
    isValid = false
  }

  if (isValid) {
    await appDispatch(openPdf(pdfFile.path))
  }

  return isValid
}
