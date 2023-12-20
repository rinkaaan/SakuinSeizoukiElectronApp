import React from "react"
import { Box, Button, Container, Select, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import { appDispatch } from "../../../../common/store"


export function Step2() {
  const { selectedPageTypeIndex, openPdfOut, pageTypeOptions } = useSelector(newProjectSelector)
  const selectedPageType = (selectedPageTypeIndex + 1).toString()

  return (
    <Box margin={{ bottom: "l" }}>
      <Container>
        <SpaceBetween size="l">
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <SpaceBetween size="xs" direction="horizontal" alignItems="center">
              <Select
                selectedOption={{ value: selectedPageType, label: `Type ${selectedPageType}` }}
                onChange={({ detail }) => {
                  appDispatch(newProjectActions.updateSlice({ selectedPageTypeIndex: parseInt(detail.selectedOption.value) - 1 }))
                }}
                options={pageTypeOptions}
              />
            </SpaceBetween>
            <SpaceBetween size="xs" direction="horizontal" alignItems="center">
              <Button
                disabled={selectedPageTypeIndex === 0}
                onClick={() => {
                  appDispatch(newProjectActions.decrementPageTypeIndex())
                }}
              >
                Previous
              </Button>
              <Button
                disabled={selectedPageTypeIndex === openPdfOut.page_types.length - 1}
                onClick={() => {
                  appDispatch(newProjectActions.incrementPageTypeIndex())
                }}
              >
                Next
              </Button>
            </SpaceBetween>
          </div>
          <TextContent>
            <p>Annotate the text and page number regions for each page type.</p>
          </TextContent>
            <div style={{ width: "100%", height: "500px", backgroundColor: "gray" }} />
        </SpaceBetween>
      </Container>
    </Box>
  )
}
