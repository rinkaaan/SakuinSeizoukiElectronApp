import React from "react"
import { Box, Container, Header, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../../components/CloudButton"
import { Form } from "react-router-dom"

const SelectPdf = () => {
  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size='l'>
        <Container>
          <Form method='POST'>
            <CloudButton formAction='submit'>Choose file</CloudButton>
            <input type='hidden' name='action' value='open-pdf'/>
          </Form>
        </Container>
        <Container header={<Header variant='h2'>Annotate text region</Header>}>
          <div>
            Fake region here
          </div>
        </Container>
      </SpaceBetween>
    </Box>
  )
}

export default SelectPdf
