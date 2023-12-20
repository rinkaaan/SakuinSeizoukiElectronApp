import React, { useEffect } from "react"
import { Box, Button, Container, Select, SelectProps, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectActions, newProjectSelector } from "../../../../slices/newProjectSlice"
import { appDispatch } from "../../../../common/store"


export function Step2() {
  const { selectedPageTypeIndex, openPdfOut } = useSelector(newProjectSelector)
  const selectedPageType = (selectedPageTypeIndex + 1).toString()
  const [options, setOptions] = React.useState<SelectProps.Option[]>([])

  useEffect(() => {
    if (openPdfOut) {
      const newOptions: SelectProps.Option[] = []
      for (let i = 0; i < openPdfOut.page_types.length; i++) {
        newOptions.push({
          label: `Type ${i + 1}`,
          value: (i + 1).toString(),
        })
      }
      setOptions(newOptions)
    }
  }, [openPdfOut])

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <SpaceBetween size="xs" direction="horizontal" alignItems="center">
            <Select
              selectedOption={{ value: selectedPageType, label: `Type ${selectedPageType}` }}
              onChange={({ detail }) => {
                appDispatch(newProjectActions.updateSlice({ selectedPageTypeIndex: parseInt(detail.selectedOption.value) - 1 }))
              }}
              options={options}
            />
          </SpaceBetween>
          <SpaceBetween size="xs" direction="horizontal" alignItems="center">
            <Button
              disabled={selectedPageTypeIndex === 0}
              onClick={() => {
                appDispatch(newProjectActions.updateSlice({ selectedPageTypeIndex: selectedPageTypeIndex - 1 }))
              }}
            >
              Previous
            </Button>
            <Button
              disabled={selectedPageTypeIndex === openPdfOut.page_types.length - 1}
              onClick={() => {
                appDispatch(newProjectActions.updateSlice({ selectedPageTypeIndex: selectedPageTypeIndex + 1 }))
              }}
            >
              Next
            </Button>
          </SpaceBetween>
        </div>
        <TextContent>
          <p>Annotate the text and page number regions for each page type.</p>
        </TextContent>
        <Container>
          <div style={{ width: "100%", height: "500px", backgroundColor: "gray" }} />
        </Container>
      </SpaceBetween>
    </Box>
  )
}
