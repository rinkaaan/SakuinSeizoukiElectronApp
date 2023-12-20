import React from "react"
import { Alert, Box, Container, FileUpload, FileUploadProps, FormField, NonCancelableCustomEvent, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector, openPdf } from "../../../../slices/newProjectSlice"
import store, { appDispatch } from "../../../../common/store"
import { OpenAPI } from "../../../../../openapi-client"
import { commonActions } from "../../../../slices/commonSlice"

export function Step1() {
  const { pdfFile, missingPdf, pageImage, latestStepIndex } = useSelector(newProjectSelector)

  function onChange({ detail }: NonCancelableCustomEvent<FileUploadProps.ChangeDetail>) {
    if (latestStepIndex !== 0) {
      appDispatch(
        commonActions.addNotification({
          type: "warning",
          content: "Previous steps cannot be modified.",
        })
      )
      return
    }
    if (!detail.value.length) {
      appDispatch(newProjectActions.updateSlice({ pdfFile: undefined, pageImage: undefined }))
      return
    } else {
      const pdfFile = detail.value[0]
      const pageImage = `${OpenAPI.BASE}/project/get/pdf/page?pdf_path=${encodeURIComponent(pdfFile.path)}&page_number=1`
      appDispatch(newProjectActions.updateSlice({ pdfFile, pageImage }))
    }
  }

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Container>
          <SpaceBetween size="s">
            <FormField>
              <FileUpload
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
                constraintText="Select one PDF file"
                accept="application/pdf"
              />
            </FormField>
            {missingPdf && !pdfFile && (
              <Alert type="warning">
                No file selected. Please select a file to continue.
              </Alert>
            )}
            {pageImage && (
              <img
                src={pageImage}
                alt="PDF preview"
                style={{
                  maxHeight: "1000px",
                  maxWidth: "100%"
                }}
              />
            )}
          </SpaceBetween>
        </Container>
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
  await appDispatch(openPdf(pdfFile.path))
  return true
}
