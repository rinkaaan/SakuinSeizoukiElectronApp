import React from "react"
import { Box, Header, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function MissingPagesTable() {
  const { createIndexOut } = useSelector(newProjectSelector)
  const missingPages = createIndexOut?.missing_pages || []
  const { items, paginationProps, collectionProps } = useCollection(
    missingPages,
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  return createIndexOut?.missing_pages && (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Table
          {...collectionProps}
          pagination={<Pagination {...paginationProps} />}
          items={items}
          columnDefinitions={[
            {
              id: "page",
              header: "Page number",
              cell: item => item,
              isRowHeader: true,
            },
          ]}
          variant="container"
          empty={
            <Box
              margin={{ vertical: "xs" }}
              textAlign="center"
              color="inherit"
            >
              <SpaceBetween size="m">
                <b>No pages missing.</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header counter={`(${missingPages.length})`}>
              Missing pages
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}
