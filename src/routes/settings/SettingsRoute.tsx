import { Alert, Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { ActionFunctionArgs, Form } from "react-router-dom"
import CloudButton from "../../components/CloudButton"
import { appDispatch } from "../../common/store"
import { mainSelector, setAppDataDirectory } from "../../slices/mainSlice"
import { useSelector } from "react-redux"

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get("action")
  if (action === "setup-dir") {
    const path = await window.electron.selectDir()
    if (!path) return null
    await appDispatch(setAppDataDirectory(path))
  }
  return null
}

export function Component() {
  const { appDataDirectory } = useSelector(mainSelector)

  return (
    <ContentLayout
      header={
        <Header variant="h1">Settings</Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">App Data Directory</Header>}>
          <SpaceBetween size="s">
            {appDataDirectory ? (
              <Alert type="success">
                App data directory is set to <b>{appDataDirectory}</b>.
              </Alert>
            ) : (
              <Alert type="warning">
                The app data directory needs to be set before you can use the application. Click the button below to select a folder.
              </Alert>
            )}
            <Form method="POST">
              <CloudButton formAction="submit">{appDataDirectory ? "Change" : "Set"} app data directory</CloudButton>
              <input type="hidden" name="action" value="setup-dir"/>
              <TextContent>
                <p>
                  <small>
                    You can {appDataDirectory ? "change" : "set"} the app data directory by clicking the button above and selecting an empty folder or use an existing app data folder.
                  </small>
                </p>
              </TextContent>
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
