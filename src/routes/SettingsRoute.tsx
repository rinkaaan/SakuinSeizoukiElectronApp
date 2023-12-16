import { Alert, Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { ActionFunctionArgs, Form, useActionData, useRevalidator } from "react-router-dom"
import React from "react"
import CloudButton from "../components/CloudButton"
import { commonSlice } from "../slices/commonSlice"

interface ActionData {
  revalidate: boolean
}

export async function action({ request }: ActionFunctionArgs): Promise<ActionData | null> {
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === "setup-dir") {
    const path = await window.electron.selectDir()
    if (!path) return null
    commonSlice.setAppDataDirectory(path)
    return {
      revalidate: true,
    }
  }
  return null
}

export function Component() {
  const revalidator = useRevalidator()
  const { revalidate } = useActionData() as ActionData || {}

  React.useEffect(() => {
    if (revalidate) revalidator.revalidate()
  }, [revalidate])

  return (
    <ContentLayout
      header={
        <Header variant="h1">Settings</Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">App Data Directory</Header>}>
          <SpaceBetween size="s">
            {commonSlice.appDataDirectory ? (
              <Alert type="success">
                App data directory is set to <b>{commonSlice.appDataDirectory}</b>.
              </Alert>
            ) : (
              <Alert type="warning">
                The app data directory needs to be set before you can use the application. Click the button below to select a folder.
              </Alert>
            )}
            <Form method="POST">
              <CloudButton formAction="submit">{commonSlice.appDataDirectory ? "Change" : "Set"} app data directory</CloudButton>
              <input type="hidden" name="action" value="setup-dir"/>
            </Form>
          </SpaceBetween>
        </Container>
        <Container header={<Header variant="h2">About</Header>}>
          <TextContent>
            <p>Version 0.1.0</p>
          </TextContent>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
