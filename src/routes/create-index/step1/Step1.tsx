import React from "react"
import { Box, Container, FileUploadProps, FormField, Header, NonCancelableCustomEvent, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createIndexActions, createIndexSelector, getPdfPageTypes } from "../createIndexSlice"
import store, { appDispatch } from "../../../common/store"
import { OpenAPI } from "../../../../openapi-client"
import CloudFileUpload from "../../../components/CloudFileUpload"

export function Step1() {
  const { pdfFile, errorMessages, pageImage, latestStepIndex } = useSelector(createIndexSelector)

  function onChange({ detail }: NonCancelableCustomEvent<FileUploadProps.ChangeDetail>) {
    appDispatch(createIndexActions.clearErrorMessages())
    if (!detail.value.length) {
      appDispatch(createIndexActions.updateSlice({ pdfFile: undefined, pageImage: undefined }))
      return
    } else {
      const pdfFile = detail.value[0]
      if (!pdfFile) return
      const pageImage = `${OpenAPI.BASE}/pdf/page-image?pdf_path=${encodeURIComponent(pdfFile.path)}&page_number=1`
      appDispatch(createIndexActions.updateSlice({ pdfFile, pageImage }))
    }
  }

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        {/*<Container header={<Header>Select a PDF file</Header>}>*/}
        <Container header={<Header>PDFファイルを選択</Header>}>
          <SpaceBetween size="s">
            <FormField>
              <CloudFileUpload
                errorText={errorMessages["pdfFile"]}
                disabled={latestStepIndex !== 0}
                onChange={onChange}
                value={pdfFile ? [pdfFile] : []}
                i18nStrings={{
                  // uploadButtonText: e =>
                  //   e ? "Choose files" : "Choose file",
                  uploadButtonText: e =>
                    e ? "ファイルを選択" : "ファイルを選択",
                  // dropzoneText: e =>
                  //   e
                  //     ? "Drop files"
                  //     : "Drop file",
                  dropzoneText: e =>
                    e
                      ? "ファイルをドロップ"
                      : "ファイルをドロップ",
                  // removeFileAriaLabel: e =>
                  //   `Remove file ${e + 1}`,
                  removeFileAriaLabel: e =>
                    `ファイル ${e + 1} を削除`,
                  // limitShowFewer: "Show fewer files",
                  limitShowFewer: "ファイルを少なく表示",
                  // limitShowMore: "Show more files",
                  limitShowMore: "ファイルを多く表示",
                  // errorIconAriaLabel: "Error"
                  errorIconAriaLabel: "エラー"
                }}
                showFileSize
                showFileThumbnail
                // constraintText="You can also drag and drop the file here"
                constraintText="ここにファイルをドラッグ＆ドロップすることもできます"
                accept=".pdf"
              />
            </FormField>
          </SpaceBetween>
        </Container>
        {pageImage && (
          // <Container header={<Header>PDF preview</Header>}>
          <Container header={<Header>PDFプレビュー</Header>}>
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
  const { pdfFile } = store.getState().createIndex
  let isValid = true

  if (!pdfFile) {
    appDispatch(createIndexActions.addMissingErrorMessage("pdfFile"))
    isValid = false
  }

  if (isValid) {
    await appDispatch(getPdfPageTypes(pdfFile.path))
  }

  return isValid
}
