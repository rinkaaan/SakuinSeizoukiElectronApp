import { Alert, Button, Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { testingActions, testingSelector } from "./testingSlice"
import { testingDispatch } from "./testingStore"
import "@cloudscape-design/global-styles/index.css"

export function Component() {
  const { appDataDirectory } = useSelector(testingSelector)

  function onSetAppDataDirectory() {
    if (appDataDirectory) {
      testingDispatch(testingActions.updateSlice({
        appDataDirectory: null,
      }))
    } else {
      testingDispatch(testingActions.updateSlice({
        appDataDirectory: "/Users/nguylinc/Desktop/test",
      }))
    }
  }

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
            <Button onClick={onSetAppDataDirectory}>{appDataDirectory ? "Change" : "Set"} app data directory</Button>
            <TextContent>
              <p>
                <small>
                  You can {appDataDirectory ? "change" : "set"} the app data directory by clicking the button above and selecting an empty folder or use an existing app data folder.
                </small>
              </p>
            </TextContent>
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
