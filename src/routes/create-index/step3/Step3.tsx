import React from "react"
import { Box, Button, Container, FileUploadProps, FormField, Header, Input, NonCancelableCustomEvent, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import store, { appDispatch } from "../../../common/store"
import { createIndex, getWordList, createIndexActions, createIndexSelector } from "../createIndexSlice"
import CloudFileUpload from "../../../components/CloudFileUpload"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function Step3() {
  const { errorMessages, wordListFile, isLoading, sheetName, startCell, endCell, getWordListOut } = useSelector(createIndexSelector)
  const { items, paginationProps, collectionProps } = useCollection(
    getWordListOut?.word_list || [],
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  function onChange({ detail }: NonCancelableCustomEvent<FileUploadProps.ChangeDetail>) {
    appDispatch(createIndexActions.clearErrorMessages())
    if (!detail.value.length) {
      appDispatch(createIndexActions.updateSlice({ wordListFile: undefined, pageImage: undefined }))
      return
    } else {
      const wordListFile = detail.value[0]
      if (!wordListFile) return
      appDispatch(createIndexActions.updateSlice({ wordListFile }))
    }
  }

  function formatCellCoordinate(cell: string) {
    // allow only letters and numbers
    let value = cell.replace(/[^a-zA-Z0-9]/g, "")
    // convert all letters to uppercase
    value = value.toUpperCase()
    return value
  }

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Container header={<Header>Select an XLSX file</Header>}>
          <SpaceBetween size="s">
            <FormField>
              <CloudFileUpload
                // disabled={latestStepIndex !== 2}
                errorText={errorMessages["wordListFile"]}
                onChange={onChange}
                value={wordListFile ? [wordListFile] : []}
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
                accept=".xlsx"
              />
            </FormField>
            <FormField
              label="Sheet name"
              errorText={errorMessages["sheetName"]}
            >
              <Input
                value={sheetName}
                placeholder="Enter value"
                onChange={event => {
                  appDispatch(createIndexActions.clearErrorMessages())
                  appDispatch(createIndexActions.updateSlice({ sheetName: event.detail.value }))
                }}
              />
            </FormField>
            <SpaceBetween size="l" direction="horizontal">
              <FormField
                label="Start cell"
                errorText={errorMessages["startCell"]}
                stretch={true}
              >
                <Input
                  value={startCell}
                  placeholder="Enter value"
                  onChange={event => {
                    appDispatch(createIndexActions.clearErrorMessages())
                    appDispatch(createIndexActions.updateSlice({ startCell: formatCellCoordinate(event.detail.value) }))
                  }}
                />
              </FormField>
              <FormField
                label="End cell"
                errorText={errorMessages["endCell"]}
                stretch={true}
              >
                <Input
                  value={endCell}
                  placeholder="Enter value"
                  onChange={event => {
                    appDispatch(createIndexActions.clearErrorMessages())
                    appDispatch(createIndexActions.updateSlice({ endCell: formatCellCoordinate(event.detail.value) }))
                  }}
                />
              </FormField>
            </SpaceBetween>
          </SpaceBetween>
        </Container>
        <Table
          {...collectionProps}
          pagination={<Pagination {...paginationProps} />}
          items={items}
          columnDefinitions={[
            {
              id: "word",
              header: "Word",
              cell: item => item,
              isRowHeader: true,
            },
          ]}
          variant="container"
          empty={
            <Box
              margin={{ vertical: "xs" }}
              textAlign="center"
              color="inherit"
            >
              <SpaceBetween size="m">
                <Button
                  onClick={previewWordList}
                  disabled={isLoading["getWordList"]}
                  loading={isLoading["getWordList"]}
                >Click to preview word list</Button>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header
              actions={
                <Button
                  iconName="refresh"
                  onClick={previewWordList}
                  disabled={isLoading["getWordList"]}
                  loading={isLoading["getWordList"]}
                />
              }
              counter={`(${getWordListOut?.word_list?.length || 0})`}
            >
              Word list
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}

async function previewWordList() {
  await validateStep3(true)
  await appDispatch(getWordList())
}

export async function validateStep3(skipCreateIndex = false) {
  appDispatch(createIndexActions.clearErrorMessages())
  const { wordListFile, startCell, endCell, sheetName } = store.getState().createIndex
  let isValid = true

  if (!wordListFile) {
    appDispatch(createIndexActions.addMissingErrorMessage("wordListFile"))
    isValid = false
  }
  if (!sheetName) {
    appDispatch(createIndexActions.addMissingErrorMessage("sheetName"))
    isValid = false
  }
  if (!startCell) {
    appDispatch(createIndexActions.addMissingErrorMessage("startCell"))
    isValid = false
  }
  if (!endCell) {
    appDispatch(createIndexActions.addMissingErrorMessage("endCell"))
    isValid = false
  }

  if (isValid && !skipCreateIndex) {
    await appDispatch(createIndex())
  }

  return isValid
}
