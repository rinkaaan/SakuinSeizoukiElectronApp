import React from "react"
import { Alert, Box, Header, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function MissingWordsTable() {
  const { createIndexOut } = useSelector(newProjectSelector)
  const { items, paginationProps, collectionProps } = useCollection(
    createIndexOut?.missing_words || [],
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  return createIndexOut?.missing_words && (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Table
          {...collectionProps}
          pagination={<Pagination {...paginationProps} />}
          items={items}
          columnDefinitions={[
            {
              id: "word",
              header: "Word",
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
                <b>No words missing. All words have at least one page.</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header>
              Missing words
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}
