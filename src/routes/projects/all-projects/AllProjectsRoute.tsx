import CloudTable from "@cloudscape-design/components/table"
import Box from "@cloudscape-design/components/box"
import SpaceBetween from "@cloudscape-design/components/space-between"
import React, { Fragment, useState } from "react"
import Header from "./Header.jsx"
import { TextFilter } from "@cloudscape-design/components"
import { useLoaderData } from "react-router-dom"
import CloudLink from "../../../components/CloudLink"
import { formatDate } from "../../../common/typedUtils"
import CloudButton from "../../../components/CloudButton"

interface LoaderData {
  pets: any[];
}

export async function loader(): Promise<LoaderData> {
  return {
    pets: [],
  }
}

export function Component() {
  const { pets } = useLoaderData() as LoaderData
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  return (
    <Fragment>
      <CloudTable
        loading={pets == null}
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
            cell: item => <CloudLink href={`/pets/details/${item.id}`}>{item.name}</CloudLink>,
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
        items={pets}
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
