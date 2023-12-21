import CloudTable from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box"
import SpaceBetween from "@cloudscape-design/components/space-between"
import React, { Fragment, useState } from "react"
import Header from "./Header"
import { TextFilter } from "@cloudscape-design/components"
import { useLoaderData } from "react-router-dom"
import CloudLink from "../../../components/CloudLink"
import { formatDate } from "../../../common/typedUtils"
import CloudButton from "../../../components/CloudButton"
import { Project } from "../../../../openapi-client"

interface LoaderData {
  projects: Project[]
}

export async function loader(): Promise<LoaderData> {
  return {
    projects: [],
  }
}

export function Component() {
  const { projects } = useLoaderData() as LoaderData
  const [selectedItems, setSelectedItems] = useState<Project[]>([])

  return (
    <Fragment>
      <CloudTable
        loading={projects == null}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
        }}
        stickyHeader={true}
        columnDefinitions={[
          {
            id: "name",
            header: "Project name",
            cell: item => <CloudLink href={`/projects/details/${item.id}`}>{item.name}</CloudLink>,
            sortingField: "name",
            isRowHeader: true,
          },
          {
            id: "created_at",
            header: "Created at",
            cell: item => formatDate(item.created_at),
            sortingField: "created_at",
          },
        ]}
        columnDisplay={[
          {
            id: "name",
            visible: true,
          },
          {
            id: "created_at",
            visible: true,
          },
        ]}
        items={projects}
        loadingText="Loading projects"
        selectionType="multi"
        trackBy="id"
        variant="full-page"
        empty={
          <Box
            margin={{ vertical: "xs" }}
            textAlign="center"
            color="inherit"
          >
            <SpaceBetween size="m">
              <b>No projects</b>
              <CloudButton href="/projects/new">Create project</CloudButton>
            </SpaceBetween>
          </Box>
        }
        header={<Header selectedItemsCount={selectedItems.length}/>}
        filter={
          <TextFilter
            filteringPlaceholder="Search projects"
            filteringClearAriaLabel="Clear"
            filteringText=""
          />
        }
      />
    </Fragment>
  )
}
