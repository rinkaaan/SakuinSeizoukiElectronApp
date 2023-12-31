import React from "react"
import { Box, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"
import { MissingWordsTable } from "./MissingWordsTable"
import { MissingPagesTable } from "./MissingPagesTable"
import { IndexTable } from "./IndexTable"

export function Step4() {
  const { latestStepIndex } = useSelector(newProjectSelector)

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <MissingWordsTable />
        <MissingPagesTable />
        <IndexTable />
      </SpaceBetween>
    </Box>
  )
}
