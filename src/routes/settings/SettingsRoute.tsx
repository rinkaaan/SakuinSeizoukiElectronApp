import { Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"

export function Component() {

  return (
    <ContentLayout
      header={
        // <Header variant="h1">Settings</Header>
        <Header variant="h1">設定</Header>
      }
    >
      <SpaceBetween size="l">
        {/*<Container header={<Header variant="h2">About</Header>}>*/}
        <Container header={<Header variant="h2">アプリについて</Header>}>
          <TextContent>
          {/*<p>Version 1.0.0</p>*/}
          <p>バージョン 1.0.0</p>
          </TextContent>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
