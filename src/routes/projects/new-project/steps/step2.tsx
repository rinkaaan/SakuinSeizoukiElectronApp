import React from "react"
import { Box, Container, Header, SpaceBetween } from "@cloudscape-design/components"


export function Step2() {
  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">Annotate text region</Header>}>
          <div>
            Fake region here
          </div>
        </Container>
      </SpaceBetween>
    </Box>
  )
}
