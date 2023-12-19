import React from "react"
import { Alert, Box, Container, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../../components/CloudButton"
import { Form } from "react-router-dom"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import store, { appDispatch } from "../../../../common/store"
import { ProjectService } from "../../../../../openapi-client"

export function Step1() {
  const { pdfPath, missingPdf, latestStepIndex } = useSelector(newProjectSelector)

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size='l'>
        <Container>
          <SpaceBetween size="s">
            <Form method='POST'>
              <CloudButton disabled={latestStepIndex !== 0} formAction='submit'>Select file</CloudButton>
              <input type='hidden' name='action' value='open-pdf'/>
            </Form>
            {pdfPath && (
              <Alert type="success">
                {pdfPath ? `Selected file: ${pdfPath}` : "No file selected"}
              </Alert>
            )}
            {missingPdf && !pdfPath && (
              <Alert type="warning">
                No file selected. Please select a file to continue.
              </Alert>
            )}
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Box>
  )
}

export async function validateStep1() {
  const { pdfPath } = store.getState().newProject
  if (!pdfPath) {
    appDispatch(newProjectActions.updateSlice({ missingPdf: true }))
    return false
  }
  const openPdfOut = await ProjectService.postProjectNewPdf({ pdf_path: pdfPath })
  appDispatch(newProjectActions.updateSlice({ openPdfOut, pdfPath }))
  return true
}
