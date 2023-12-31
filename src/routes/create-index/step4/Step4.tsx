import React from "react"
import { Alert, Box, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"
import { MissingWordsTable } from "./MissingWordsTable"
import { MissingPagesTable } from "./MissingPagesTable"
import { IndexTable } from "./IndexTable"

export function Step4() {
  const { createIndexOut } = useSelector(newProjectSelector)

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        {createIndexOut?.missing_words && (
          <Alert type="warning" statusIconAriaLabel="Warning">
            No pages were found for the words below.
          </Alert>
        )}
        <MissingWordsTable />
        {createIndexOut?.missing_pages && (
          <Alert type="warning" statusIconAriaLabel="Warning">
            No pages were found for the page numbers below.
          </Alert>
        )}
        <MissingPagesTable />
        <IndexTable />
      </SpaceBetween>
    </Box>
  )
}
