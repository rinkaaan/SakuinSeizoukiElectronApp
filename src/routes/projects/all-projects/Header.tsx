import React from "react"
import { Button, Header as CloudHeader, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../components/CloudButton"

export default function Header({
  title = "Projects",
  createButtonText = "Create project",
  extraActions = null,
  selectedItemsCount,
  ...props
}) {
  const isOnlyOneSelected = selectedItemsCount === 1

  return (
    <CloudHeader
      variant="awsui-h1-sticky"
      actions={
        <SpaceBetween size="xs" direction="horizontal">
          {extraActions}
          <Button data-testid="header-btn-edit" disabled={!isOnlyOneSelected}>
            Edit
          </Button>
          <Button
            data-testid="header-btn-delete"
            disabled={selectedItemsCount === 0}
          >
            Delete
          </Button>
          <CloudButton variant="primary" href="/projects/new">
            {createButtonText}
          </CloudButton>
        </SpaceBetween>
      }
      {...props}
    >
      {title}
    </CloudHeader>
  )
}
