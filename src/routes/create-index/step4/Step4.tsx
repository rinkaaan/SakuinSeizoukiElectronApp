import React from "react"
import { Box } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"

export function Step4() {
  const { getWordListOut, latestStepIndex } = useSelector(newProjectSelector)

  return (
    <Box margin={{ bottom: "l" }}>

    </Box>
  )
}
