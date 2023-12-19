import React from "react"
import { Alert, Box, Container, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../../components/CloudButton"
import { Form } from "react-router-dom"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import store, { appDispatch } from "../../../../common/store"

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

export function Step1Validate() {
  console.log("Step1Validate")
  const { openPdfOut, pdfPath } = store.getState().newProject
  const isValid = openPdfOut && pdfPath
  if (!isValid) {
    appDispatch(newProjectActions.updateSlice({ missingPdf: true }))
  }
  return isValid
}
