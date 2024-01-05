import React from "react"
import { Box, Header, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { newProjectSelector } from "../newProjectSlice"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function IndexTable() {
  const { createIndexOut } = useSelector(newProjectSelector)
  const wordPages = createIndexOut?.word_pages || []
  const { items, paginationProps, collectionProps } = useCollection(
    wordPages,
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  return (
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
              cell: item => item.word,
              isRowHeader: true,
            },
            {
              id: "pages",
              header: "Pages",
              cell: item => item.pages.join(", "),
              width: "100%",
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
                <b>No words</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header counter={`(${wordPages.length})`}>
              Index
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}
